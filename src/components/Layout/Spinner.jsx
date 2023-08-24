import React from 'react'

export default function Spinner() {
  return (
    <div style={{height: '100%'}} className="w-100 container-fluid d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary">
          <span className="visually-hidden" />
        </div>
        <div className="spinner-border text-secondary">
          <span className="visually-hidden" />
        </div>
        <div className="spinner-border text-success">
          <span className="visually-hidden" />
        </div>
        <div className="spinner-border text-danger">
          <span className="visually-hidden" />
        </div>
    </div>
  )
}
