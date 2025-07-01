import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ReportTypes from './Types/ReportManagement/Report-Types';
import List from './Types/ReportManagement/List';
import CreateNew from './Types/ReportManagement/create-new';
import Show from './Types/ReportManagement/Show';
 
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
      },
      {
        path: '/report-types/create-new',
        element: <CreateNew/>,
      },
      {
        path: '/report-types/Show',
        element: <Show/>,
      }
    ]
  }
]);

export default router;
