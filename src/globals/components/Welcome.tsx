import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import PageWrap from "../PageWrap"
import Logo from "data-base64:~assets/mail-logo.png"
import Button from "..//Button"

function Welcome() {
    const navigate = useNavigate()
    // Used to Hide and UnHide Scroll Bar due to routing animation issue
    useEffect(() => {
        document.documentElement.style.overflow = "hidden"
        document.body.style.overflow = "hidden"
    
        return () => {
          document.documentElement.style.overflow = "auto"
          document.body.style.overflow = "auto"
        }
      }, [])
    return (
        <PageWrap>
            <div className='min-h-screen w-full flex flex-col overflow-hidden'>

                <div className="flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
                    <div className="flex flex-col items-center justify-center text-center gap-2 p-2">
                        <img src={Logo} alt="logo" className="w-36 h-36" />
                        <p className="text-2xl font-bold font-bricolage">Extension is Ready!</p>
                        <p className='text-sm font-arimo'>Welcome User, Scan potential Spear-Phishing Email/Phishing Email Attacks</p>
                        <Button variant="primary" size="large" onClick={() => navigate("/main")}>Scan Now</Button>
                    </div>

                </div>
                <div className="absolute flex flex-row justify-center bottom-0 w-full pb-4 p-5">
                    <div className="text-justify">
                        <p className="text-xs font-arimo text-gray-300 font-medium">
                            Disclaimer: Our system is still under development and may not 
                            detect all threats accurately at this time. However, it will continue 
                            to improve over time through the use of advanced LLM technology. Rest assured, we do not store or access any customer or user
                             data to ensure your privacy and security.</p>

                    </div>

                </div>
            </div>
        </PageWrap>
    )
}

export default Welcome