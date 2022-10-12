import { Button, Modal, Input } from 'antd';
import React, { useEffect, useState } from 'react';
const axios = require('axios').default;

const EditEmployeeModal = ({ isOpen, handleClose, emp }) => {
    const [loading, setLoading] = useState(false);
    const [empId, setEmpId] = useState(null)
    const [firstName, setFirstName] = useState('')
    const [middleInitial, setMiddleInitial] = useState('')
    const [lastName, setLastName] = useState('')
    const [socSecNo, setSocSecNo] = useState('')
    const [hireDate, setHireDate] = useState('')
    const [salary, setSalary] = useState('')
    const [commissionPct, setCommissionPct] = useState('')
    const [deptCode, setDeptCode] = useState('')
    const [jobCode, setJobCode] = useState('')
    const [managerId, setManagerId] = useState('')
    const [empData, setEmpData] = useState([])

    useEffect(()=>{
        if(emp){
            setEmpId(emp.employee_id)
            setFirstName(emp.first_name)
            setMiddleInitial(emp.middle_initial)
            setLastName(emp.last_name)
            setSocSecNo(emp.soc_sec_no)
            setHireDate(emp.hire_date)
            setSalary(emp.salary)
            setCommissionPct(emp.commission_pct)
            setDeptCode(emp.department_code)
            setJobCode(emp.job_code)
            setManagerId(emp.manager_id)
        }
    }, [emp])

    const handleOk = async() => {
        setLoading(true);
        const data = {
            first_name: firstName,
            middle_initial: middleInitial,
            last_name: lastName,
            soc_sec_no: socSecNo,
            hire_date: hireDate,
            salary: salary,
            commission_pct: commissionPct,
            department_code: deptCode,
            job_code: jobCode,
            manager_id: managerId
        }
        try {
            const response = await axios.put(`https://apex.oracle.com/pls/apex/agilecrew/employee/edit/${empId}`, data);
            console.log(response);
            setTimeout(()=>{setLoading(false);}, 3000)
            handleClose();
            window.location.reload()
          } catch (error) {
            console.error(error);
          }
    };

    return (
        <>
            <Modal
                open={isOpen}
                title="Edit Employee"
                onOk={handleOk}
                onCancel={() => handleClose()}
                footer={[
                    <Button key="back" onClick={() => handleClose()}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Edit
                    </Button>
                ]}
            >
                Employee Id
                <Input placeholder="Enter Employee Id" value={empId} onChange={(e)=>setEmpId(e.target.value)} disabled/>
                First Name
                <Input placeholder="Enter First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                Middle Initial
                <Input placeholder="Enter Middle Initial" value={middleInitial} onChange={(e)=>setMiddleInitial(e.target.value)} />
                Last Name
                <Input placeholder="Enter Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                Soc Sec No
                <Input placeholder="Enter Soc Sec No" value={socSecNo} onChange={(e)=>setSocSecNo(e.target.value)} />
                Hire Date
                <Input placeholder="Enter Hire Date" value={hireDate} onChange={(e)=>setHireDate(e.target.value)} />
                Salary
                <Input placeholder="Enter Salary" value={salary} onChange={(e)=>setSalary(e.target.value)} />
                Commission Pct
                <Input placeholder="Enter Commission Pct" value={commissionPct} onChange={(e)=>setCommissionPct(e.target.value)} />
                Department Code
                <Input placeholder="Enter Department Code" value={deptCode} onChange={(e)=>setDeptCode(e.target.value)} />
                Job Code
                <Input placeholder="Enter Job Code" value={jobCode} onChange={(e)=>setJobCode(e.target.value)} />
                Manager Id
                <Input placeholder="Enter Manager Id" value={managerId} onChange={(e)=>setManagerId(e.target.value)} />
            </Modal>
        </>
    );
};

export default EditEmployeeModal;