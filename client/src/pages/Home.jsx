import React from 'react';
import logo from '../../public/bruinbiteslogotrans.png'; // Adjust the path according to your project structure

export default function Home() {
    const homeStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align items at the top
        textAlign: 'center',
        padding: '20px',
        marginTop: '0px', // Adjust margin to ensure content is below the navbar
    };

    const logoStyle = {
        width: '250px', // Adjust the size as needed
        height: 'auto',
        marginBottom: '0px',
    };

    const titleStyle = {
        fontSize: '48px',
        marginBottom: '20px',
    };

    const blurbStyle = {
        fontSize: '24px',
        maxWidth: '800px',
    };

    return (
        <div style={homeStyle}>
            <img src={logo} alt="Bruin Bites Logo" style={logoStyle} />
            <h1 style={titleStyle}>Welcome to Bruin Bites</h1>
            <p style={blurbStyle}>
                At Bruin Bites, we understand the busy schedules of UCLA students and the importance of convenient meals. That's why we're here to bring the delicious flavors of UCLA Hill dining right to your doorstep.
            </p>
            <p style={blurbStyle}>
                Our easy-to-use web app allows you to browse through a wide selection of meals from the diverse culinary offerings of UCLA Hill. Whether you're craving a hearty salad from the Study or a burrito from Rende West, Bruin Bites has you covered.
            </p>
            <p style={blurbStyle}>
                Say goodbye to long lines and crowded dining halls. With Bruin Bites, you can enjoy the convenience of delicious, high-quality meals delivered straight to your doorstep, so you can focus on what matters most – your studies, your friends, and your UCLA experience.
            </p>
            <p style={blurbStyle}>
                Join us today and experience the ultimate convenience of Bruin Bites meal delivery service. It's time to elevate your dining experience with the click of a button!
            </p>
        </div>
    );
    
}
