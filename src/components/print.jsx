import React, { useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import { TableComponent, ListComponent, Titlefield, Textfield, Button } from './dependencies';

const Sheet = ({ data }) => {
    const { tasks, capacities, details, notes } = data;
    return (
        <div className='layout'>
            <div className='layout_title'>
                <Titlefield className={'text-center'} text={details.team_name || 'SpaceX'} />
                <Titlefield className={'text-center'} text={details.sprint_name} />
                <Textfield className={'text-center m-2'} text={'( ' + details.start_date + ' - ' + details.end_date + ' )'} />
            </div>
            <Titlefield className={'text-left m-3'} text={'Summary'} />
            <div className='row m-3'>
                <ListComponent data={notes} />
            </div>
            <div className='row m-1'>
                <div className='col-sm-2'></div>
                <div className='col-sm-8'>
                    <TableComponent title={'Tasks'} data={tasks} />
                </div>
            </div>
            <br />
            <div className='row m-1'>
                <div className='col-sm-2'></div>
                <div className='col-sm-8'>
                    <TableComponent title={'Capacity'} data={capacities} />
                </div>
            </div>
        </div>
    );
}

const Preview = ({ data, handlePreview }) => {

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <div className='row m-2'>
                <div className='col-sm-1'>
                    <Button name={"Home"} onClick={handlePreview} />
                </div>
                <div className='col-sm-10'></div>
                <div className='col-sm-1'>
                    <Button name={"Download"} onClick={handlePrint} />
                </div>
            </div>
            <div ref={componentRef} className="print__section">
                <Sheet data={data} />
            </div>
        </>
    )
}

export default Preview;