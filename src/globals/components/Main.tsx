import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../style.css"
import Header from "../Header"
import Footer from "../Footer"
import Button from "../Button"
import Search from "data-base64:~assets/search-logo.png"
import PageWrap from "../PageWrap"
import Loading from "./Loading"
import { checkHealth, analyzeEmail } from "utils/api"

interface EmailData {
    sender: string;
    subject: string;
    body: string;
}

const Main = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true)
    const [apiStatus, setApiStatus] = useState({ openai_api_ready: false, model_ready: false })
    const [emailData, setEmailData] = useState<EmailData>({
        sender: "",
        subject: "",
        body: ""
    })

    //Check if Model is Ready to use
    useEffect(() => {
        checkHealth().then(setApiStatus)
    }, []);
    //Manual Input ofX
    const handleInputChange = (field: keyof EmailData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEmailData(prev => ({
            ...prev,
            [field]: e.target.value
        }))
    }
    //Extract Email Data from Current Tab
    const handleExtractEmail = async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab?.id) {
          chrome.runtime.sendMessage({ action: "extractEmailData" });
        }
      };
    
      useEffect(() => {
        const listener = (message: EmailData) => {
          if (message.sender || message.subject || message.body) {
            setEmailData(message);
            setIsDisabled(false);
          }
        };
    
        chrome.runtime.onMessage.addListener(listener);
        return () => chrome.runtime.onMessage.removeListener(listener);
      }, []);
    //This will send the email data to the backend and get the result
    const handleCheck = async () => {
        if (!emailData.body) {
            alert("Please enter email content")
            return
        }

        try {
            setIsLoading(true);
            console.log('Starting email analysis...');
            const result = await analyzeEmail(emailData);
            console.log('Main component - Analysis result:', result);
            console.log('Main component - About to navigate to /result');
            
            // Force a small delay before navigation
            await new Promise(resolve => setTimeout(resolve, 100));
            
            console.log('Main component - Executing navigation...');
            navigate('/result', { 
                state: { result },
                replace: true // Try using replace instead of push
            });
            console.log('Main component - Navigation executed');
        } catch (error) {
            console.error('Error in handleCheck:', error);
            alert('Failed to analyze email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <PageWrap>
            <div className="min-h-screen w-full flex flex-col">
                {isLoading && <Loading />}
                <Header />
                <main className="flex-1 flex flex-col justify-center items-center w-full gap-4">
                    <div className="flex flex-col justify-center items-center w-full h-40 text-center px-10">
                        <img src={Search} alt="search" className="w-24 h-28" />
                        <p className="text-xl font-bricolage">Extension is Ready!</p>
                        <p className="text-sm font-arimo">Our LLM based Spear Phishing
                            Email Detector is ready.</p>
                    </div>

                    <form className="w-full max-w-md mx-auto px-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="bg-gray-100 rounded-lg shadow-md p-4">
                            <div className="relative mb-4">
                                <h2 className="font-bold text-xl font-bricolage">EMAIL CONTENT
                                    <span className={`absolute -top-2 -right-4 text-xs px-2 py-1 rounded-full ${apiStatus.openai_api_ready && apiStatus.model_ready ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                        {apiStatus.openai_api_ready && apiStatus.model_ready ? "Model is Ready" : "Model is not Ready"}
                                    </span>
                                </h2>
                            </div>
                            <label className="block text-lg font-semibold font-bricolage">Email Sender</label>
                            <input 
                                type="text" 
                                value={emailData.sender}
                                onChange={handleInputChange("sender")}
                                placeholder={isDisabled ? "Click 'Manual' button to enable editing..." : "Type or paste sender email here..."} 
                                className={`w-full p-2 mb-2 rounded-md focus:border-sky focus:ring-2 focus:outline-none ${isDisabled ? "cursor-not-allowed bg-gray-50" : "cursor-text"}`}  
                                readOnly={isDisabled}
                            />
                            <label className="block text-lg font-semibold font-bricolage">Email Subject</label>
                            <input 
                                type="text"
                                value={emailData.subject}
                                onChange={handleInputChange("subject")}
                                placeholder={isDisabled ? "Click 'Manual' button to enable editing..." : "Type or paste email subject here..."} 
                                className={`w-full p-2 mb-2 rounded-md focus:border-sky focus:ring-2 focus:outline-none ${isDisabled ? "cursor-not-allowed bg-gray-50" : "cursor-text"}`}  
                                readOnly={isDisabled}
                            />
                            <label className="block text-lg font-semibold font-bricolage">Email Content</label>
                            <textarea 
                                value={emailData.body}
                                onChange={handleInputChange("body")}
                                placeholder={isDisabled ? "Click 'Manual' button to enable editing..." : "Type or paste email body here..."} 
                                className={`w-full p-2 h-40 rounded-md focus:border-sky focus:ring-2 focus:outline-none ${isDisabled ? "cursor-not-allowed bg-gray-50" : "cursor-text"}`} 
                                readOnly={isDisabled}
                            />
                        </div>
                    </form>
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <div className="flex flex-row gap-2">
                            <Button variant="primary" size="small" onClick={handleExtractEmail}>Extract</Button>
                            <Button variant="primary" size="small" onClick={() => setIsDisabled(false)}>Manual</Button>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Button variant="primary" size="large" onClick={handleCheck}>Check Email   &rarr;</Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </PageWrap>
    )
}

export default Main