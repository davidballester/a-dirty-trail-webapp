import React from 'react';

const ListOfNames = ({ names = [] }: { names: string[] }) => {
    if (!names.length) {
        return null;
    }
    if (names.length === 1) {
        return <strong>{names[0]}</strong>;
    }
    return (
        <>
            {names.slice(0, names.length - 1).map((name, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <span>, </span>}
                    <strong>{name}</strong>
                </React.Fragment>
            ))}
            <span> and </span>
            <strong>{names[names.length - 1]}</strong>
        </>
    );
};

export default ListOfNames;
