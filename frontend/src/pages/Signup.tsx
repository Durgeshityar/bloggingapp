import { useState } from 'react'
import { AuthHeaderSignup } from '../components/AuthHeaderSignup'
import { CustomButton } from '../components/CustomButton'
import { Label } from '../components/Label'
import { Quote } from '../components/Quote'
import { SignupInput } from '@durgeshityaar/medium-common2'
import axios from 'axios'
import { DB_URL } from '../config'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
  const [inputs, setInputs] = useState<SignupInput>({
    name: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleRequest = async () => {
    try {
      const response = await axios.post(`${DB_URL}/api/v1/user/signup`, inputs)
      const jwt = response.data.jwt

      localStorage.setItem('token', `Bearer ${jwt}`)
      navigate('/blog')
    } catch (e) {
      console.error(` error while sending reques => ${e}`)
      // add alert library here
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className=" flex justify-center pt-32 md:pt-0 ">
        <div className="flex flex-col justify-center mx-5 max-w-sm ">
          <div>
            <AuthHeaderSignup
              title={'Create an account'}
              subTitle1={'Already have an account?'}
              subTitle2={'Login'}
              routeName={'/signin'}
            />
          </div>
          <div>
            <Label
              title={'Username'}
              type={'text'}
              placeholder={'Enter your username'}
              onChange={(e) => {
                setInputs((c) => ({
                  ...c,
                  name: e.target.value,
                }))
              }}
            />
          </div>
          <div>
            <Label
              title={'Email'}
              type={'text'}
              placeholder={'durgesh@gmail.com'}
              onChange={(e) => {
                setInputs((c) => ({
                  ...c,
                  email: e.target.value,
                }))
              }}
            />
          </div>
          <div>
            <Label
              title={'Password'}
              type={'password'}
              placeholder={'min 6 characters'}
              onChange={(e) => {
                setInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }))
              }}
            />
          </div>
          <div>
            <CustomButton title={'Signup'} onClick={handleRequest} />
          </div>
        </div>
      </div>

      <div className="  hidden md:block">
        <Quote />
      </div>
    </div>
  )
}
