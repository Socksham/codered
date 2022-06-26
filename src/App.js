import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from "./Home";
import Hospital from "./Hospital";
// import Doctor from "./Doctor";
import Auth from "./Auth";
import PhoneNumber from "./PhoneNumber";
import HospitalNA from "./HospitalNA";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/hospital" element={<Hospital />} />
                    {/* <Route path="/hospital/:duid" element={<Doctor />} /> */}
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/phonenumber" element={<PhoneNumber />} />
                    <Route path="/nameaddress" element={<HospitalNA />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
