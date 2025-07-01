import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ReportTypes from './Types/ReportManagement/Report-Types';
import List from './Types/ReportManagement/List';
 
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/report-types',    
        element: <ReportTypes/>,
      },
      {
        path: '/report-types/list',
        element: <List/>,
      }
    ]
  }
]);

export default router;
