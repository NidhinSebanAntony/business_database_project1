import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';

import '../../App.css'
import DeleteEmployeeModal from '../DeleteEmployeeModal/DeleteEmployeeModal';
import EditEmployeeModal from '../EditEmployeeModal/EditEmployeeModal';
const axios = require('axios').default;

const EmployeeTable = () => {
  const [empData, setEmpData] = useState([])
  const [isEditOpen, setEditOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)
  const [selectedDeleteId, setSelectedDeleteId] = useState(null)
  const [selectedEdit, setSelectedEdit] = useState(null)

  useEffect(() => {
    fetchEmployeeDetails()
  }, [])
  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get('https://apex.oracle.com/pls/apex/agilecrew/employee/view');
      setEmpData(response.data.items)
      console.log(empData);
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Middle Initial</th>
            <th>Last Name</th>
            <th>Soc Sec No</th>
            <th>Hire Date</th>
            <th>Salary</th>
            <th>Commission Pct</th>
            <th>Department Code</th>
            <th>Job Code</th>
            <th>Manager Id</th>
            <th colSpan={2}>Action(s)</th>
          </tr>
        </thead>
        <tbody>
          {empData && empData.length > 0 && empData.map((item) => {
            return (
              <tr>
                <td>{item.employee_id}</td>
                <td>{item.first_name}</td>
                <td>{item.middle_initial}</td>
                <td>{item.last_name}</td>
                <td>{item.soc_sec_no}</td>
                <td>{item.hire_date}</td>
                <td>{item.salary}</td>
                <td>{item.commission_pct}</td>
                <td>{item.dept_code}</td>
                <td>{item.job_code}</td>
                <td>{item.manager_id}</td>
                <td>
                  <Button variant="outline-success" onClick={() => { setEditOpen(true); setSelectedEdit(item) }}>Edit</Button>{' '}
                  <Button variant="outline-danger" onClick={() => { setDeleteOpen(true); setSelectedDeleteId(item.employee_id) }}>Delete</Button>{' '}
                </td>
              </tr>
            )
          })
          }
        </tbody>
      </Table>
      <DeleteEmployeeModal
        isOpen={isDeleteOpen}
        handleClose={() => setDeleteOpen(false)}
        empId={selectedDeleteId}
      />
      <EditEmployeeModal
        isOpen={isEditOpen}
        handleClose={() => setEditOpen(false)}
        emp={selectedEdit}
      />
    </>
  )
}



export default EmployeeTable;