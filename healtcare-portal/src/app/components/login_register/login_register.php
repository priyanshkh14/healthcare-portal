
<?php
require('connection.php');
session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function sendMail($email, $v_code)
{
    require("PHPMailer/PHPMailer.php");
    require("PHPMailer/SMTP.php");
    require("PHPMailer/Exception.php");

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();  // Send using SMTP
        $mail->Host = 'smtp.gmail.com';  // Set the SMTP server to send through
        $mail->SMTPAuth = true;  // Enable SMTP authentication
        $mail->Username = 'medicarecenterr@gmail.com';  // SMTP username
        $mail->Password = 'ukwm cmyq anih blnx';  // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // Enable implicit TLS encryption
        $mail->Port = 587;  // TCP port to connect to; use 587 if you have set SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS

        $mail->setFrom('medicarecenterr@gmail.com');
        $mail->addAddress($email);  // Add a recipient

        $mail->isHTML(true);  // Set email format to HTML
        $mail->Subject = 'Email Verification from MediCare';
        $mail->Body = "
            Dear User,
            
            Thank you for registering with MediCare. To ensure the security of your account and access all our features, please verify your email address by clicking the link below:
            
            <a href ='http:/localhost/login_register/verify.php?email=$email&v_code=$v_code'>Verify</a>
        
            Please click the link or copy and paste it into your web browser's address bar to complete the verification process.
            
            If you did not sign up for an account on MediCare, please ignore this email. Your account will not be activated unless you verify your email address.
            
            If you encounter any issues or have questions, please contact our support team at support.medicare@gmail.com.
            
            Thank you for choosing MediCare for your healthcare needs.
            
            Best regards,
            The MediCare Team
        ";

        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

if (isset($_POST['login'])) {
    $email_username = mysqli_real_escape_string($con, $_POST['email_username']);
    $password = mysqli_real_escape_string($con, $_POST['password']);

    $query = "SELECT * FROM registered_users WHERE email='$email_username' OR username='$email_username'";
    $result = mysqli_query($con, $query);

    if ($result) {
        if (mysqli_num_rows($result) == 1) {
            $result_fetch = mysqli_fetch_assoc($result);
            if (password_verify($password, $result_fetch['password'])) {
                $_SESSION['logged_in'] = true;
                $_SESSION['username'] = $result_fetch['username'];
                header("location: index.php");
                exit; // Add exit to prevent further execution
            } else {
                echo "
                    <script>
                        alert('Incorrect password');
                        window.location.href='index.php';
                    </script>
                ";
            }
        } else {
            echo "
                <script>
                    alert('Email or Username not registered');
                    window.location.href='index.php';
                </script>
            ";
        }
    } else {
        echo "
            <script>
                alert('Cannot run Query');
                window.location.href='index.php';
            </script>
        ";
    }
}

if (isset($_POST['register'])) {
    $username = mysqli_real_escape_string($con, $_POST['username']);
    $email = mysqli_real_escape_string($con, $_POST['email']);
    $fullname = mysqli_real_escape_string($con, $_POST['fullname']);
    $password = mysqli_real_escape_string($con, $_POST['password']);

    $user_exist_query = "SELECT * FROM registered_users WHERE username='$username' OR email='$email'";
    $result = mysqli_query($con, $user_exist_query);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $result_fetch = mysqli_fetch_assoc($result);
            if ($result_fetch['username'] == $username) {
                echo "
                  <script>
                     alert('$result_fetch[username] - Username already taken');
                     window.location.href = 'index.php';
                  </script>
                ";
            } else {
                echo "
                  <script>
                    alert('$result_fetch[email] - E-mail already taken');
                    window.location.href = 'index.php';
                  </script>
                ";
            }
        } else {
            $password_hashed = password_hash($password, PASSWORD_BCRYPT);
            $v_code = bin2hex(random_bytes(16));
            $query = "INSERT INTO registered_users (full_name, username, email, password, verification_code, is_verified) VALUES ('$fullname', '$username', '$email', '$password_hashed', '$v_code', '0')";

            if (mysqli_query($con, $query) && sendMail($email, $v_code)) {
                echo "
                  <script>
                     alert('Registration Successful');
                     window.location.href = 'index.php';
                  </script>
                ";
            } else {
                echo "
                  <script>
                     alert('Cannot Run Query');
                     window.location.href = 'index.php';
                  </script>
                ";
            }
        }
    } else {
        echo "
          <script>
            alert('Cannot Run Query');
            window.location.href = 'index.php';
          </script>
        ";
    }
}
?>