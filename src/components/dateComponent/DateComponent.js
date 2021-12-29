import React from 'react'
import moment from 'moment';
import {
    CSelect,
    CRow,
    CCol
} from "@coreui/react";

import {
    twentyEighth
} from './dayValues';

const DateComponent = ({ day, month, year, onChange }) => {

    const current = moment();
    const defautlYears = [];
    const lastYear = current.subtract(18, 'years').year();

    const defaultDays = twentyEighth.map(day => (<option key={day} value={day}>{day}</option>));

    for (let index = lastYear; index >= 1955; index--) {
        defautlYears.push(index)
    }

    const buildDayList = () => {
        current.month(Number(month) - 1);
        current.year(year);
        switch (current.daysInMonth()) {
            case 28: return defaultDays
            case 29: return defaultDays.concat([29].map(day => (<option key={day} value={day}>{day}</option>)))
            case 30: return defaultDays.concat([29, 30].map(day => (<option key={day} value={day}>{day}</option>)))
            case 31: return defaultDays.concat([29, 30, 31].map(day => (<option key={day} value={day}>{day}</option>)))
        }
    }

    return (
        <CRow>
            <CCol className="pr-1">
                <CSelect custom value={day} onChange={onChange} name="day">
                    <option disabled value="">día</option>
                    {buildDayList()}
                </CSelect>
            </CCol>
            <CCol className="px-2">
                <CSelect custom value={month} onChange={onChange} name="month">
                    <option disabled value="">mes</option>
                    <option value="01">Enero</option>
                    <option value="02">Febrero</option>
                    <option value="03">Marzo</option>
                    <option value="04">Abril</option>
                    <option value="05">Mayo</option>
                    <option value="06">Junio</option>
                    <option value="07">Julio</option>
                    <option value="08">Agosto</option>
                    <option value="09">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciempre</option>
                </CSelect>
            </CCol>
            <CCol className="pl-1">
                <CSelect custom value={year} onChange={onChange} name="year">
                    <option disabled value="">año</option>
                    {
                        defautlYears.map((year) => <option key={year} value={year}>{year}</option>)
                    }
                </CSelect>
            </CCol>
        </CRow>
    )
}

export default DateComponent
