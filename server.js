const express = require('express');
const path = require('path');

const app = express();
const PORT = 3002;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Store applications (in production, use a database)
let applications = [];

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle form submission
app.post('/apply', (req, res) => {
    // Get all form data
    const application = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        fullName: req.body.full_name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        licenseNumber: req.body.license_number,
        licenseState: req.body.license_state,
        licenseExpiry: req.body.license_expiry,
        experience: req.body.experience,
        vehicleTypes: req.body.vehicle_type || [],
        currentEmployer: req.body.current_employer,
        supervisorName: req.body.supervisor_name,
        reasonForLeaving: req.body.reason_for_leaving,
        position: req.body.position,
        availability: req.body.availability,
        authorized: req.body.authorize ? 'Yes' : 'No',
        atWill: req.body.at_will ? 'Yes' : 'No'
    };
    
    // Store the application
    applications.push(application);
    
    console.log('New application received from:', application.fullName);
    
    // Send success response
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Application Submitted - Valley Industrial Truck</title>
            <style>
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    max-width: 800px; 
                    margin: 0 auto; 
                    padding: 20px;
                    background-color: #f4f4f4;
                }
                .success-container {
                    background: #ffffff;
                    padding: 30px;
                    margin: 50px auto;
                    border-radius: 8px;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    border-left: 5px solid #28a745;
                }
                .success-icon {
                    font-size: 60px;
                    color: #28a745;
                    margin-bottom: 20px;
                }
                .success-message {
                    background: #d4edda;
                    color: #155724;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .application-info {
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 15px 0;
                    text-align: left;
                }
                .btn {
                    display: inline-block;
                    padding: 12px 24px;
                    background: #e8491d;
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                    margin-top: 15px;
                    border: none;
                    cursor: pointer;
                    font-size: 16px;
                }
                .btn:hover {
                    background: #cf401a;
                }
            </style>
        </head>
        <body>
            <div class="success-container">
                <div class="success-icon">✓</div>
                <div class="success-message">
                    <h2>Application Submitted Successfully!</h2>
                    <p>Thank you, <strong>${application.fullName}</strong>, for applying to Valley Industrial Truck.</p>
                </div>
                
                <div class="application-info">
                    <h3>Application Details:</h3>
                    <p><strong>Application ID:</strong> ${application.id}</p>
                    <p><strong>Position:</strong> ${application.position}</p>
                    <p><strong>Email:</strong> ${application.email}</p>
                    <p><strong>Phone:</strong> ${application.phone}</p>
                    <p><strong>Submitted:</strong> ${new Date(application.timestamp).toLocaleString()}</p>
                </div>
                
                <p>We have received your application and will review it carefully. Our hiring team will contact you within 2-3 business days.</p>
                
                <button class="btn" onclick="window.location.href='/'">Submit Another Application</button>
            </div>
        </body>
        </html>
    `);
});

// Route to view all applications (for admin/testing)
app.get('/applications', (req, res) => {
    res.json({
        total: applications.length,
        applications: applications
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║    Valley Industrial Truck Recruitment        ║
║              Server Running!                  ║
╠═══════════════════════════════════════════════╣
║ Local:    http://localhost:${PORT}           ║
║ Network:  http://YOUR_TERMUX_IP:${PORT}      ║
║                                               ║
║ Form:     http://localhost:${PORT}           ║
║ Apps:     http://localhost:${PORT}/applications ║
╚═══════════════════════════════════════════════╝
    `);
});
