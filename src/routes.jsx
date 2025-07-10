import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ReportTypes from './Types/ReportManagement/Report-Types';
import CreateNew from './Types/ReportManagement/create-new';
import Show from './Types/ReportManagement/Show';
import Edit from './Types/ReportManagement/Edit';
import ColumnTypes from './Ty-Mapping/column-type';
import ColumnShow from './Ty-Mapping/column-show';
import ColumnEdit from './Ty-Mapping/column-edit';
import ColumnCreate from './Ty-Mapping/column-create';
import ConfigType from './Re-conif/config-type';
import ConfigShow from './Re-conif/config-show';
import ConfigEdit from './Re-conif/config-edit';
import ConfigCreate from './Re-conif/config-create';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/report-types', element: <ReportTypes /> },
      { path: '/report-types/create-new', element: <CreateNew /> },
      { path: '/report-types/Show', element: <Show /> },
      { path: '/report-types/edit/:id', element: <Edit /> },

      { path: '/column-types', element: <ColumnTypes /> },
      { path: '/column-type/column-show', element: <ColumnShow /> },
      { path: '/column-type/column-edit/:id', element: <ColumnEdit /> }, //  keep only this one
      { path: '/column-type/column-create', element: <ColumnCreate /> },

      { path: '/config-type', element: <ConfigType /> },
      { path: '/config-type/config-show', element: <ConfigShow /> },
      { path: '/config-type/config-edit/:id', element: <ConfigEdit /> },
      { path: '/config-type/config-create', element: <ConfigCreate /> },
    ]
  }
]);

export default router;
