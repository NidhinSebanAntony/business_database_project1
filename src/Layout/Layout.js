import { Layout, Typography } from 'antd';
import React, { useState } from 'react';
import EmployeeTable from '../components/Employee Table/EmployeeTable';
import '../App.css';
import AddEmployeeModal from '../components/AddEmployeeModal/AddEmployeeModal';
import { Button } from 'react-bootstrap';

const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;

const BasicLayout = () => {
  const [isAddEmpModalOpen, setAddEmpModal] = useState(false)
  const handleCloseAddEmployeeModal = () => {
    setAddEmpModal(false)
  }
  return (
    <>
      <Layout>
        <Header>
          <div className='app-header'>
            <Title level={4} >
              <span className='app-title'>Employees Information</span>
            </Title>
          </div>
        </Header>
        <Content>
          <div className='section'>
            <div className='add-btn'>
              <Button variant="outline-info" onClick={()=>setAddEmpModal(true)}>Add Employee</Button>
            </div>
            <EmployeeTable />
          </div>
        </Content>
        <Footer>
          <div className='app-footer'>
            <Text type="secondary">
              <span className='app-footer-text'>Made With &hearts;. &copy; 2022. All Rights Reserved. </span>
            </Text>
          </div>
        </Footer>
      </Layout>
      <AddEmployeeModal 
        isOpen={isAddEmpModalOpen}
        handleClose={handleCloseAddEmployeeModal}
      />
    </>
  )
}

export default BasicLayout;
