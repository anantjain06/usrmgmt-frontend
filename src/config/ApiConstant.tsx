const API_BASE_URL = process.env.API_BASE_URL || 'http://127.0.0.1:5100/api';


export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/login`,
    USER: `${API_BASE_URL}/user`,
    FileUpload:`${API_BASE_URL}/upload_file`,
    FileMerge:`${API_BASE_URL}/merge_file`,
    CHAT:`${API_BASE_URL}/chat`,
    BACKLOG_ADD:`${API_BASE_URL}/add_backlog`,
    BACKLOG_GET:`${API_BASE_URL}/get_backlog`,
    // Add other endpoints...
};