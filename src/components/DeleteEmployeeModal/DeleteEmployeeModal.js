import { Button, Modal, Input } from 'antd';
import React, { useState } from 'react';
const axios = require('axios').default;

const DeleteEmployeeModal = ({ isOpen, handleClose, empId }) => {
    const [loading, setLoading] = useState(false);
    const [empData, setEmpData] = useState([])

    const handleOk = async() => {
        setLoading(true);
        
        try {
            const response = await axios.put(`https://apex.oracle.com/pls/apex/agilecrew/employee/delete/${empId}`, {});
            console.log(response);
            setTimeout(()=>{setLoading(false);}, 3000)
            handleClose();
          } catch (error) {
            console.error(error);
          }
    };
    
    return (
        <>
            <Modal
                open={isOpen}
                title="Delete Employee"
                onOk={handleOk}
                onCancel={() => handleClose()}
                footer={[
                    <Button key="back" onClick={() => handleClose()}>
                        No
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Yes
                    </Button>
                ]}
            >
                Do you want to delete this employees details?
            </Modal>
        </>
    );
};

export default DeleteEmployeeModal;