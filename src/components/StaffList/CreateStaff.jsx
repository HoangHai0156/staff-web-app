import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'

const schema = yup.object({
    email: yup.string().email("Email không hợp lệ").required()
                .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Email không đúng ffinhj dạng"),
    name: yup.string()
        .min(5, "Tên phải nhiều hơn 5 ký tự")
        .max(20)
        .required(),
    introduction: yup.string().min(5, "Giới thiệu phải chứa ít nhất 5 ký tự").required()
})

export default function CreateStaff() {

    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const [departmentList, setDepartmentList] = useState([]);

    useEffect(()=>{
       (async()=>{
        const res = await axios.get('https://64e70f6bb0fd9648b78f48ae.mockapi.io/Department');
        setDepartmentList(res.data);
       })()
    }, [])

    const createSubmit = async (data) => {
        const newStaff = {...data, department: JSON.parse(data.department)};

        const res = await axios.post('https://64e70f6bb0fd9648b78f48ae.mockapi.io/Staff', newStaff);

        if(res && res.data){
            toast.success('Create successfully!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }

        reset();

    }

    return (
    <div>
        <h5 className='text-center text-success col-12 pb-2'>Create New Staff</h5>
        <div className='col-12 d-flex align-items-center justify-content-center'>
            <form onSubmit={handleSubmit(createSubmit)} className='col-4 p-2 form-group'>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" {...register('name')} id="floatingName" placeholder="name" />
                    <label htmlFor="floatingName">Fullname</label>
                    <span className='text-danger'>{errors.name?.message}</span>
                </div>

                <div className="form-floating mb-3">
                    <input type="email" className="form-control" {...register('email')} id="floatingEmail" placeholder="name@example.com" />
                    <label htmlFor="floatingEmail">Email address</label>
                    <span className='text-danger'>{errors.email?.message}</span>
                </div>

                <div className='my-2'>
                    <span className='pe-3'>Gender</span>
                    <div className="form-check form-check-inline form-switch">
                        <input className="form-check-input" type="radio" {...register('gender')} id="inlineRadio1" defaultChecked value={'male'} />
                        <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                    </div>

                    <div className="form-check form-check-inline form-switch">
                        <input className="form-check-input" type="radio" {...register('gender')} id="inlineRadio2" value={'female'} />
                        <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                    </div>
                </div>
                
                <div className="form-floating mb-3">
                    <input type="url" className="form-control" {...register('avatar')} id="floatingAvatar" placeholder='url.png'/>
                    <label htmlFor="floatingAvatar">Avatar</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" {...register('introduction')} id="floatingIntroduction" placeholder='bla bla bla'/>
                    <label htmlFor="floatingIntroduction">Introduction</label>
                    <span className='text-danger'>{errors.introduction?.message}</span>
                </div>

                <div className='form-group mb-3'>
                    <label className='mb-1'>Department</label>
                    <select {...register('department')} className="form-select">
                        
                        {
                            departmentList?.map((department,index) => (
                                <option key={index} value={JSON.stringify(department)}>{department.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className='p-3 border-start border-3 border-warning'>
                    <button type='submit' className='btn btn-outline-success me-3'>Submit</button>
                    <button type='button' className='btn btn-outline-warning' onClick={()=>reset()}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}
