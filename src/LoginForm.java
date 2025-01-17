import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

import javax.swing.*;

public class LoginForm extends JFrame {
    final private Font mainFont = new Font("Segoe print", Font.BOLD, 18);
    JTextField tfEmail;
    JPasswordField pfPassword;

    /* Create form */
    public void initialize() {
        JLabel lbLoginForm = new JLabel("Login Form", SwingConstants.CENTER);
        lbLoginForm.setFont(mainFont);

        JLabel lbEmail = new JLabel("Email");
        lbEmail.setFont(mainFont);

        tfEmail = new JTextField(); // Corrected to allow user input
        tfEmail.setFont(mainFont);

        JLabel lbPassword = new JLabel("Password");
        lbPassword.setFont(mainFont);

        pfPassword = new JPasswordField();
        pfPassword.setFont(mainFont);

        JPanel formPanel = new JPanel();
        formPanel.setLayout(new GridLayout(0, 1, 10, 10));
        formPanel.add(lbLoginForm);
        formPanel.add(lbEmail);
        formPanel.add(tfEmail);
        formPanel.add(lbPassword);
        formPanel.add(pfPassword);

        /************* Buttons panel ***********/
        /* Login button */
        JButton btnLogin = new JButton("Login");
        btnLogin.setFont(mainFont);
        btnLogin.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String email = tfEmail.getText();
                String password = String.valueOf(pfPassword.getPassword());

                User user = getAuthenticatedUser(email, password);

                if (user != null) {
                    MainFrame mainFrame = new MainFrame();
                    mainFrame.initialize(user);
                    dispose();
                } else {
                    JOptionPane.showMessageDialog(LoginForm.this,
                            "Email or Password invalid",
                            "Try again",
                            JOptionPane.ERROR_MESSAGE);
                }
            }
        });

        /*** Cancel Button ***/
        JButton btnCancel = new JButton("Cancel");
        btnCancel.setFont(mainFont);
        btnCancel.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                dispose(); // Close the window
            }
        });

        /* Adding buttons to Panel */
        JPanel buttonsPanel = new JPanel();
        buttonsPanel.setLayout(new GridLayout(1, 2, 10, 0));
        buttonsPanel.add(btnLogin);
        buttonsPanel.add(btnCancel);

        /********* Initialize the frame ********/
        add(formPanel, BorderLayout.NORTH);
        add(buttonsPanel, BorderLayout.SOUTH);

        setTitle("Login Form");
        setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
        setSize(400, 500);
        setMinimumSize(new Dimension(350, 450));
        setLocationRelativeTo(null);
        setVisible(true);
    }

    private User getAuthenticatedUser(String email, String password) {
        User user = null;

        final String DB_URL = "jdbc:postgresql://localhost:5432/your_database"; // Replace with your database URL
        final String USERNAME = "root"; // Replace with your database username
        final String PASSWORD = ""; // Replace with your database password

        try {
            // Establish connection to database
            Connection conn = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD);

            // Execute SQL query
            String sql = "SELECT * FROM users WHERE email=? and password=?";
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            preparedStatement.setString(1, email);
            preparedStatement.setString(2, password);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                user = new User();
                user.name = resultSet.getString("name");
                user.email = resultSet.getString("email");
                user.phone = resultSet.getString("phone");
                user.address = resultSet.getString("address");
                user.password = resultSet.getString("password");
            }

            preparedStatement.close();
            conn.close();

        } catch (Exception e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(this, "Database connection failed", "Error", JOptionPane.ERROR_MESSAGE);
        }

        return user;
    }

    public static void main(String[] args) {
        LoginForm loginForm = new LoginForm();
        loginForm.initialize();
    }
}
