import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import Header from "../Header"
import Footer from "../Footer"
import Button from "../Button"
import PageWrap from "../PageWrap"

interface AnalysisResult {
    is_phishing: boolean;
    explanation: string;
}

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result as AnalysisResult;

    useEffect(() => {
        console.log('Result component - Mounted');
        console.log('Result component - Location:', location);
        console.log('Result component - Location state:', location.state);
        console.log('Result component - Result:', result);

        if (!result) {
            console.log('No result found, navigating to /main');
            navigate('/main', { replace: true });
        }
    }, [location, navigate, result]);

    if (!result) {
        console.log('No result found, returning null');
        return null;
    }

    return (
        <PageWrap>
            <div className="min-h-screen w-full flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col justify-center items-center w-full gap-4 p-4">
                    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold font-bricolage mb-6 text-center">
                            Analysis Result
                        </h2>
                        
                        <div className={`p-4 rounded-lg mb-6 ${
                            result.is_phishing 
                                ? "bg-red-100 border border-red-400 text-red-700" 
                                : "bg-green-100 border border-green-400 text-green-700"
                        }`}>
                            <h3 className="text-xl font-bold mb-2">
                                {result.is_phishing ? "⚠️ Phishing Detected" : "✅ Legitimate Email"}
                            </h3>
                            <p className="whitespace-pre-wrap">{result.explanation}</p>
                        </div>

                        <div className="flex justify-center">
                            <Button 
                                variant="primary" 
                                size="medium" 
                                onClick={() => {
                                    console.log('Analyze Another Email clicked');
                                    navigate('/main', { replace: true });
                                }}
                            >
                                Analyze Another Email
                            </Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </PageWrap>
    );
};

export default Result; 