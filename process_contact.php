<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    $to = "saxenasameer98@gmail.com";
    $subject = "New Member Added - NGO Contact";
    
    $email_content = "New member details:\n\n";
    $email_content .= "Name: " . $name . "\n";
    $email_content .= "Email: " . $email . "\n";
    $email_content .= "Phone: " . $phone . "\n";
    $email_content .= "Message: " . $message . "\n";

    $headers = "From: " . $email . "\r\n";
    
    if(mail($to, $subject, $email_content, $headers)) {
        echo json_encode(["status" => "success", "message" => "Thank you for contacting us!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Sorry, there was an error sending your message."]);
    }
    exit;
}
?> 