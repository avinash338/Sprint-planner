import React from 'react';
import '../App.css';
import { InputBox, Button } from './dependencies';

const Home = ({ sprintDetails, updateSprintDetails, setSubmitClick }) => {

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const obj = { ...sprintDetails };
        obj[name] = type === 'date' ? formatDate(value) : value;
        updateSprintDetails(obj);
    }

    const formatDate = (date) => {
        const utcTime = new Date(date);
        return utcTime.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    }

    const submitDetails = () => {
        if (Object.values(sprintDetails).includes('')) {
            alert('Please fill the details')
        } else {
            setSubmitClick(true)
        }
    }

    return (
        <>
            <h1 className='text-center mt-5'>Sprint Planner</h1>
            <div className="home">
                <InputBox
                    type={"text"}
                    name={"team_name"}
                    placeholder={'Team Name'}
                    className={"form-group m-2"}
                    onChange={e => handleInputChange(e)}
                />
                <InputBox
                    type={"text"}
                    name={"sprint_name"}
                    placeholder={'Sprint Name'}
                    className={"form-group m-2"}
                    onChange={e => handleInputChange(e)}
                />
                <InputBox
                    type={"date"}
                    name={"start_date"}
                    placeholder={'Start Date'}
                    className={"form-group m-2"}
                    onChange={e => handleInputChange(e)}
                />
                <InputBox
                    type={"date"}
                    name={"end_date"}
                    placeholder={'End Date'}
                    className={"form-group m-2"}
                    onChange={e => handleInputChange(e)}
                />
                <Button
                    className={"form-group ml_5"}
                    name={"Submit"}
                    onClick={submitDetails}
                />
            </div>
        </>
    );
}

export default Home;