import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function StaffList() {

    const [staffList, setStaffList] = useState([]);

    useEffect(()=>{
        (async ()=> {
            const res = await axios.get('https://64e70f6bb0fd9648b78f48ae.mockapi.io/Staff');
            setStaffList(res?.data);
        })()
    },[])

    return (
    <>
        <h4 className='text-start'>List of Staff</h4>
        <p className='text-primary bg-gr-1'>Enim anim sunt est mollit excepteur nulla ea amet excepteur quis ex. Aliquip dolor labore amet cillum est et nisi consequat. In enim ex non aliqua labore incididunt ex. Ea cupidatat esse commodo Lorem. Ex irure labore ea sunt anim commodo duis. .Incididunt consequat sunt quis ullamco mollit quis ipsum consequat nisi commodo non exercitation. Elit quis incididunt aliqua et ut mollit incididunt dolor non nulla est aliqua labore. Quis quis aute ex id.</p>
        <div className='container'>
        <table className="table">
            <thead className='text-center'>
                <Link className='fa-solid fa-user-plus btn btn-outline-success my-2' to={'/create'}></Link>
                <tr>
                    <th className='col-sm-1'>Interface</th>
                    <th className='col-sm-2'>Name</th>
                    <th className='col-sm-2'>Email</th>
                    <th className='col-sm-1'>Department</th>
                    <th className='col-sm-5'>Introduction</th>
                    <th className='col-sm-1'>Action</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {
                    staffList?.map((staff, index)=>(
                        <tr key={index} className='align-middle'>
                            <th>
                                <img className='w-50 rounded-circle' src={staff.avatar}
                                alt="avatar" />
                            </th>
                            <td>{staff.name}</td>
                            <td>{staff.email}</td>
                            <td>{staff.department?.name}</td>
                            <td>{staff.introduction}</td>
                            <td>
                                <i role='button' className='text-warning fa-solid fa-pen-to-square me-2'>
                                </i>
                                <i role='button' className='text-primary fa-solid fa-circle-info me-2'>
                                </i>
                                <i role='button' className='text-danger fa-solid fa-trash-can me-2'>
                                </i>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
    </>
    
  )
}
