<?php
// Database connection parameters
$host = "localhost";
$username = "id20466229_sccis";
$password = "Sccinv24!"; // Replace with your actual database password
$database = "id20466229_sccinventory";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Assuming you want to fetch the customer name and ticket number from a table named "tickets"
$sql = "SELECT firstname, ticketnum FROM tickets ORDER BY ticketnum DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Fetch data
    $row = $result->fetch_assoc();

    $ticketNumber = $row["ticketnum"];
    $ticketNumber1 =  $ticketNumber + 1;
} else {
    // No results found

    $ticketNumber = "Ticket Number Not Found";
}

// Close connection
$conn->close();
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Support Ticket</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f4;
        }

        .ticket {
            background-color: #fff;
            width: 400px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }

        .ticket-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .ticket-title {
            margin: 0;
            font-size: 24px;
            color: #333;
        }

        .ticket-number {
            font-size: 36px;
            color: #007bff; /* Highlight color */
        }

        .ticket-body {
            margin-bottom: 20px;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .label {
            font-weight: bold;
            margin-bottom: 5px;
            display: block;
        }

        .input-field {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
        }

        textarea {
            resize: vertical;
            min-height: 100px;
            width: 100%; /* Make textarea full width */
            border: 1px solid #ccc; /* Match input field border */
            border-radius: 5px; /* Match input field border radius */
            padding: 10px; /* Match input field padding */
            box-sizing: border-box; /* Ensure padding and border are included in width */
        }

        input[type="submit"] {
            padding: 10px 20px;
            border: none;
            background-color: #007bff;
            color: #fff;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            width: 100%; /* Make submit button full width */
            display: block; /* Ensure it takes up full width */
            margin-top: 10px; /* Add some space at the top */
        }

        input[type="submit"]:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="ticket">
        <div class="ticket-header">
            <h2 class="ticket-title">Support Ticket</h2>
            <p><strong class="ticket-number">#<?php echo $ticketNumber1; ?></strong></p>
        </div>
        <form action="1ticket.html" method="post">
            <div class="form-group">
                <label for="firstname" class="label">First Name:</label>
                <input type="text" id="firstname" name="firstname" class="input-field" required>
            </div>
            <div class="form-group">
                <label for="surname" class="label">Surname:</label>
                <input type="text" id="surname" name="surname" class="input-field" required>
            </div>
            <div class="form-group">
                <label for="section" class="label">Section:</label>
                <input type="text" id="section" name="section" class="input-field" required>
            </div>
            <div class="form-group">
                <label for="course" class="label">Course:</label>
                <input type="text" id="course" name="course" class="input-field" required>
            </div>
            <div class="form-group">
                <label for="email" class="label">Email:</label>
                <input type="email" id="email" name="email" class="input-field" required>
            </div>
            <div class="form-group">
                <label for="number" class="label">Phone Number:</label>
                <input type="tel" id="number" name="number" class="input-field" required>
            </div>
            <div class="form-group">
                <label for="message" class="label">Message:</label>
                <textarea id="message" name="message" class="input-field" rows="4" required></textarea>
            </div>
            <input href="1ticket.html" type="submit" value="Submit">
        </form>
    </div>
    <script>
        // Fetch the current ticket number from the server
        fetch('1ticket.html')
            .then(response => response.json())
            .then(data => {
                // Update the ticket number in the HTML
                document.getElementById('counter').textContent = data.ticketNumber;
            })
            .catch(error => console.error('Error fetching ticket number:', error));
    </script>
</body>
</html>
