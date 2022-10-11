import React, { useEffect, useState } from 'react'

export default function List() {
    let [doctors, setDoctors] = useState([])
    let listEl = document.querySelector('.listsection');

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/doctor/list", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(JSON.parse(result))
                setDoctors(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    }, [])

    function filterDoctors() {
        let searchValue = document.querySelector('#search-doctors').value;
        let speciality = document.querySelector('.specialities').value;

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/doctor/list", requestOptions)
            .then(response => response.text())
            .then(result => {
                let doctors = JSON.parse(result)
                let filtereddoctors = [];

                filtereddoctors = doctors.filter(el => {
                    console.log(el.name, searchValue);
                    return el.name.toLowerCase().includes(searchValue.toLowerCase()) || el.speciality.toLowerCase().includes(speciality.toLowerCase());
                })
                setDoctors(filtereddoctors);
            })
            .catch(error => console.log('error', error));
    }

    function closeEdit(e) {
        let data = new FormData(e.target);

        var requestOptions = {
            method: 'POST',
            body: data,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/doctor/detail", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                document.querySelector(".profileeditform").reset();
                let detailEl = document.querySelector('.addsection');
                listEl.style.display = "flex";
                detailEl.style.display = "none";
            })
            .catch(error => console.log('error', error));
    }

    function showAdd(e) {
        let detailEl = document.querySelector('.addsection');
        listEl.style.display = "none";
        detailEl.style.display = "flex";
    }

    function closeAdd(e) {
        let detailEl = document.querySelector('.addsection');
        listEl.style.display = "flex";
        detailEl.style.display = "none";
    }

    return (
        <div className="container">
            <div className="listsection">
                <p>Find World's Best Doctors</p>
                <div className="body">
                    <div className="filters">
                        <div className="filterssection">
                            <div className="label"><label htmlFor="search-doctors">Name</label></div>
                            <input onChange={(e) => filterDoctors(e)} type="text" name="search-doctors" id="search-doctors" />
                        </div>
                        <div className="filterssection">
                            <div className="label"><label htmlFor="specialities">Speciality</label></div>
                            <input onChange={(e) => filterDoctors(e)} type="text" name="specialities" className="specialities" />
                        </div>
                    </div>
                    <div className="doctors">
                        {doctors.map((el, index) => {
                            return <div key={index} className="doctor">
                                <img src={el.imageUrl} alt="" />
                                <p className='name'>Dr. {el.name}</p>
                                <p className='expert'>Expert at {el.speciality}</p>
                                <p className='rating'>Rating: {el.ratings}</p>
                            </div>
                        }
                        )}
                    </div>
                </div>
                <button className='add' onClick={(e) => showAdd(e)}><p>Add Doctor</p></button>
            </div>
            <div className="addsection">
                <div className='profileedit'>
                    <div className="header">
                        <div onClick={(e) => closeAdd(e)} className="arrow">
                            <p>←</p>
                        </div>
                        <h3>Add Doctors</h3>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        closeEdit(e)
                    }} className='profileeditform'>
                        <label htmlFor="image">Upload Photo</label>
                        <div className="profilephoto">
                            <input id="image" type="file" name="image" capture />
                        </div>
                        <div className="formeditsection">
                            <div className="label"><label htmlFor="name">Full Name</label></div>
                            <input type="text" name='name' />
                        </div>
                        <div className="formeditsection">
                            <div className="label"><label htmlFor="email">Email</label></div>
                            <input type="email" name='email' />
                        </div>
                        <div className="formeditsection">
                            <div className="label"><label htmlFor="qualification">Qualification</label></div>
                            <input type="text" name='qualification' />
                        </div>
                        <div className="formeditsection">
                            <div className="label"><label htmlFor="experience"> Experience</label></div>
                            <input type="text" name='experience' />
                        </div>
                        <div className="formeditsection">
                            <div className="label"><label htmlFor="hospital">Hospital</label></div>
                            <input type="text" name='hospital' />
                        </div>
                        <div className="formeditsection">
                            <div className="label"><label htmlFor="location">Address</label></div>
                            <input type="text" name='location' />
                        </div>
                        <div className="formeditsection">
                            <div className="label"><label htmlFor="speciality">Speciality</label></div>
                            <input type="text" name="specialities" className="specialitites" />
                        </div>
                        <button className='adddoc' type='submit'>Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
