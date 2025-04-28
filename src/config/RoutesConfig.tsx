// routesConfig.ts
import Home from '../pages/Home';
import FileScreen from '../pages/FileUpload';
import Chat from '../pages/ChatBot';
import BacklogRefinement from '../pages/Backlog';
import Roles from '../pages/admin/Roles';


export const protectedRoutes = [
    { path: '/home', element: <Home /> },
    { path: '/file-screen', element: <FileScreen /> },
    { path: '/chat-screen', element: <Chat /> },
    { path: '/back-logs', element: <BacklogRefinement /> },
    { path: 'roles', element: <Roles /> }
];
