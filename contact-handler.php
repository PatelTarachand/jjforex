<?php
// Contact Form Handler for JJ Forex Website
// This is a basic PHP script to handle contact form submissions

// Enable error reporting for development (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type to JSON
header('Content-Type: application/json');

// Allow CORS (if needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['name', 'email', 'service', 'message'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $errors[] = ucfirst($field) . ' is required';
    }
}

// Validate email format
if (!empty($input['email']) && !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format';
}

// If there are validation errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Sanitize input data
$name = htmlspecialchars(trim($input['name']));
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($input['phone'] ?? ''));
$service = htmlspecialchars(trim($input['service']));
$message = htmlspecialchars(trim($input['message']));

// Email configuration
$to_email = 'infoforex@jjraipur.com'; // Change this to your actual email
$subject = 'New Contact Form Submission - JJ Forex';

// Create email content
$email_content = "
New contact form submission from JJ Forex website:

Name: $name
Email: $email
Phone: $phone
Service: $service

Message:
$message

---
Submitted on: " . date('Y-m-d H:i:s') . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
";

// Email headers
$headers = [
    'From: noreply@jjraipur.com',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Try to send email
$mail_sent = mail($to_email, $subject, $email_content, implode("\r\n", $headers));

if ($mail_sent) {
    // Log successful submission (optional)
    $log_entry = date('Y-m-d H:i:s') . " - Contact form submitted by $name ($email)\n";
    file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! We will get back to you soon.'
    ]);
} else {
    // Return error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again later.'
    ]);
}

// Auto-reply email to the user (optional)
$auto_reply_subject = 'Thank you for contacting JJ Forex';
$auto_reply_content = "
Dear $name,

Thank you for contacting JJ Forex. We have received your message and will get back to you within 24 hours.

Your inquiry details:
Service: $service
Message: $message

Best regards,
JJ Forex Team

---
This is an automated response. Please do not reply to this email.
";

$auto_reply_headers = [
    'From: JJ Forex <infoforex@jjraipur.com>',
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Send auto-reply (optional)
mail($email, $auto_reply_subject, $auto_reply_content, implode("\r\n", $auto_reply_headers));

?>
