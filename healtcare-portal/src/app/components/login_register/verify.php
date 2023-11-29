<?php
require("connection.php");

if (isset($_GET['email']) && isset($_GET['v_code'])) {
    $email = mysqli_real_escape_string($con, $_GET['email']);  // Sanitize user input
    $v_code = mysqli_real_escape_string($con, $_GET['v_code']);  // Sanitize user input

    $query = "SELECT * FROM registered_users WHERE email='$email' AND verification_code='$v_code'";  // Use backticks for table and column names
    $result = mysqli_query($con, $query);

    if ($result) {
        if (mysqli_num_rows($result) == 1) {
            $result_fetch = mysqli_fetch_assoc($result);
            if ($result_fetch['is_verified'] == 0) {
                $update = "UPDATE registered_users SET is_verified='1' WHERE email='$email'";  // Use backticks for table and column names
                if (mysqli_query($con, $update)) {
                    echo "
                    <script>
                    alert('Email verification successful');
                    window.location.href = 'index.php';
                    </script>
                    ";
                } else {
                    echo "
                    <script>
                    alert('Email verification unsuccessful');
                    window.location.href = 'index.php';
                    </script>
                    ";
                }
            } else {
                echo "
                <script>
                alert('Email already verified');
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