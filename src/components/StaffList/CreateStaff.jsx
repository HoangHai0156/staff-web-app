import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import useGetDepartment from './../../hooks/useGetDepartment';
import { Staff } from '../../services/staffService'
import { App } from '../../services/app'
import { Link } from 'react-router-dom'
import { loadingContext } from '../context/LoadingProvider'
import Spinner from '../Layout/Spinner'

const schema = yup.object({
    email: yup.string().email("Email không hợp lệ").required()
                .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Email không đúng định dạng"),
    name: yup.string()
        .min(5, "Tên phải nhiều hơn 5 ký tự")
        .max(20)
        .required(),
    introduction: yup.string().min(5, "Giới thiệu phải chứa ít nhất 5 ký tự").required()
})

export default function CreateStaff() {
    const { loading, setLoading } = useContext(loadingContext);

    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const [departmentList] = useGetDepartment();

    const createSubmit = async (data) => {
        const newStaff = {...data, department: JSON.parse(data.department)};
        setLoading(true);
        const res = await Staff.createStaff(newStaff);
        setLoading(false);
        if(res && res.data){
            App.showSuccessAlert("Created successfully!");
        }

        reset();

    }

    return (
    <>
        <Link className='btn  btn-outline-primary' to={"/"}>
            <i className="fa-solid fa-circle-left me-2"/>
            Back to Home
        </Link>
        <div className='col-12'>
            <h5 className='text-center text-success col-12 pb-2'>Create New Staff</h5>
        </div>
        {
            loading ? <Spinner/> :
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
        }
    </>
  )
}
