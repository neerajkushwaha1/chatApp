import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const Signup = () => {
    const [input, setInput] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    })

    const { loading, signup } = useSignup()
    const handleCheckboxChange = (gender) => {
        setInput({ ...input, gender: gender })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(input)
    }
    return (
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          {/* <h1 className="text-3xl font-semibold text-center text-blue-500">
            HelpDesk
          </h1> */}
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            SignUp
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                className="w-full input input-bordered h-10 text-white"
                value={input.fullName}
                onChange={(e) =>
                  setInput({ ...input, fullName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Username
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full input input-bordered h-10 text-white"
                value={input.username}
                onChange={(e) =>
                  setInput({
                    ...input,
                    username: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full input input-bordered h-10 text-white"
                value={input.password}
                onChange={(e) =>
                  setInput({
                    ...input,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full input input-bordered h-10 text-white"
                value={input.confirmPassword}
                onChange={(e) =>
                  setInput({
                    ...input,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <GenderCheckbox
              onCheckboxChange={handleCheckboxChange}
              selectedGender={input.gender}
            />
            <Link
              to="/login"
              className="text-sm 
            text-white hover:underline hover:text-blue-600 inline-block"
            >
              Already have an Account?
            </Link>

            <div>
              <button
                className="btn
                text-white
                btn-outline
                btn-block btn-sm mt-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default Signup
