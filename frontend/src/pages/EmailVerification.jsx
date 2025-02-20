import { useState } from "react"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useAuthStore } from "@/store/authUser"
import { useNavigate } from "react-router-dom"
function EmailVerification() {
    const [otp, setOtp] = useState()
    const { verifyEmail } = useAuthStore()
    const navigate = useNavigate()

    const handleVerifyOTP = async (e) => {
        e.preventDefault()
        try {
            await verifyEmail(otp);
            navigate("/");
        } catch (error) {
            console.log(error)
            
        }
    }
    return (
        <div className='h-screen w-full hero-bg flex justify-center items-center'>
            <div className=' w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md relative bottom-40'>
                <h1 className='text-center text-white text-2xl font-bold mb-4'>Verify OTP</h1>

                <form className='space-y-4' onSubmit={handleVerifyOTP}>
                    <div>
                        <label htmlFor='otp' className='text-sm font-medium text-gray-300 block mb-3'>
                            Code has been sent to ...
                        </label>
                        <div className="space-y-2 text-white font-bold">
                            <InputOTP
                                maxLength={6}
                                value={otp}
                                onChange={(value) => setOtp(value)}
                                className=" w-full"
                            >
                                <InputOTPGroup className=" w-full">
                                    <InputOTPSlot index={0} className=" w-16 h-16 text-4xl" />
                                    <InputOTPSlot index={1} className=" w-16 h-16 text-4xl"  />
                                    <InputOTPSlot index={2} className=" w-16 h-16 text-4xl" />
                                    <InputOTPSlot index={3} className=" w-16 h-16 text-4xl" />
                                    <InputOTPSlot index={4} className=" w-16 h-16 text-4xl" />
                                    <InputOTPSlot index={5} className=" w-16 h-16 text-4xl" />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                    </div>

                    <button
                        className='w-full py-2 bg-red-600 text-white font-semibold rounded-md
        hover:bg-red-700
        '
                    // disabled={isVerifying}
                    >
                        {/*isVerifying ? "Verifying..." :*/ "Verify OTP"}
                    </button>
                </form>

                <div className='text-center text-gray-400'>
                    Didn't receive the OTP?{" "}
                    {/* <button onClick={handleResendOTP} className='text-red-500 hover:underline'>
        Resend OTP
      </button> */}
                </div>
            </div>
        </div>
    )
}

export default EmailVerification
