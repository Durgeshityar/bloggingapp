import { useState } from 'react'
import { AuthHeaderSignup } from '../components/AuthHeaderSignup'
import { CustomButton } from '../components/CustomButton'
import { Label } from '../components/Label'
import { Quote } from '../components/Quote'
import { SigninInput } from '@durgeshityaar/medium-common2'
import axios from 'axios'
import { DB_URL } from '../config'
import { useNavigate } from 'react-router-dom'

export const Signin = () => {
  const [input, setInput] = useState<SigninInput>({
    email: ' ',
    password: '',
  })

  const navigate = useNavigate()

  const handleRequest = async () => {
    try {
      const response = await axios.post(`${DB_URL}/api/v1/user/signin`, input)
      const jwt = response.data.jwt
      localStorage.setItem('Token', `Bearer ${jwt}`)
      navigate('/blog')
    } catch (e) {
      console.error(` error while sending reques => ${e}`)
      // add alert library here
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className=" flex justify-center pt-32 md:pt-0 ">
          <div className="flex flex-col justify-center mx-5 max-w-sm ">
            <div>
              <AuthHeaderSignup
                title={'Signin to your account'}
                subTitle1={`Don't have an account?`}
                subTitle2={'Signup'}
                routeName={'/signup'}
              />
            </div>

            <div>
              <Label
                title={'Email'}
                type={'text'}
                placeholder={'durgesh@gmail.com'}
                onChange={(e) => {
                  setInput((c) => ({
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
                  setInput((c) => ({
                    ...c,
                    password: e.target.value,
                  }))
                }}
              />
            </div>
            <div>
              <CustomButton title={'Signin'} onClick={handleRequest} />
            </div>
          </div>
        </div>

        <div className="  hidden md:block">
          <Quote />
        </div>
      </div>
    </div>
  )
}
