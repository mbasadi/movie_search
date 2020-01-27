// This function is designed to convert a dashed format of date to a formal format

const DateConverter=(date)=>{
    let splittedDate=date.split('-');
    return `${splittedDate[1]}/${splittedDate[2]}/${splittedDate[0]}`
};

export default DateConverter;
