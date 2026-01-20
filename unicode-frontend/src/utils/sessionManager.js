/**
 * Session Manager Utility
 * Handles localStorage operations for chat sessions
 */

const STORAGE_KEY = 'unicode_chat_sessions';
const MAX_SESSIONS = 50;

/**
 * Load all chat sessions from localStorage
 * @returns {Array} Array of session objects
 */
export const loadSessions = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading sessions:', error);
        return [];
    }
};

/**
 * Save a session to localStorage
 * @param {Object} session - Session object to save
 */
export const saveSession = (session) => {
    try {
        const sessions = loadSessions();

        // Check if session already exists
        const existingIndex = sessions.findIndex(s => s.id === session.id);

        if (existingIndex !== -1) {
            // Update existing session
            sessions[existingIndex] = {
                ...session,
                lastUpdated: Date.now()
            };
        } else {
            // Add new session
            sessions.unshift({
                ...session,
                createdAt: Date.now(),
                lastUpdated: Date.now()
            });
        }

        // Limit to MAX_SESSIONS (remove oldest)
        const limitedSessions = sessions.slice(0, MAX_SESSIONS);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedSessions));
        return limitedSessions;
    } catch (error) {
        console.error('Error saving session:', error);
        return loadSessions();
    }
};

/**
 * Delete a session from localStorage
 * @param {string} sessionId - ID of session to delete
 */
export const deleteSession = (sessionId) => {
    try {
        const sessions = loadSessions();
        const filtered = sessions.filter(s => s.id !== sessionId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return filtered;
    } catch (error) {
        console.error('Error deleting session:', error);
        return loadSessions();
    }
};

/**
 * Clear all sessions
 */
export const clearAllSessions = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return [];
    } catch (error) {
        console.error('Error clearing sessions:', error);
        return [];
    }
};

/**
 * Generate a unique session ID
 * @returns {string} Unique session ID
 */
export const generateSessionId = () => {
    // Try crypto.randomUUID if available, otherwise use timestamp
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get a session title from the first user message
 * @param {Array} messages - Array of message objects
 * @returns {string} Truncated title
 */
export const getSessionTitle = (messages) => {
    const firstUserMsg = messages.find(m => m.sender === 'user');
    if (!firstUserMsg) return 'Nueva conversación';

    const title = firstUserMsg.text.trim();
    return title.length > 40 ? title.substring(0, 40) + '...' : title;
};
