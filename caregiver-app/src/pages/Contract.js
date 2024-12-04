import React from "react";
import Navbar from "../components/navbar";
import Card from "../components/Card";
import ContractForm from "../components/ContractForm";


function Contract() {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col px-20 py-10 mt-10">
                <Card>
                    <div className="container mx-auto p-4">
                        <ContractForm />
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Contract;