import { Route, Routes as ReactRoutes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { EmployeeDetails } from './pages/EmployeeDetails';
import { EmployeesList } from './pages/EmployeesList';

export function Routes() {
  return (
    <Layout>
      <ReactRoutes>
        <Route path="/" element={<EmployeesList />} />
        <Route path="/:employeeId" element={<EmployeeDetails />} />
      </ReactRoutes>
    </Layout>
  );
}
