# <ins> MOLA </ins>

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fps428%2FMOLA&count_bg=%2317DAED&title_bg=%23555555&icon=probot.svg&icon_color=%23E7E7E7&title=Views&edge_flat=false)](https://hits.seeyoufarm.com)

MOLA is a Web App which allows the patient to book different types of ambulances in real-time based on their availability in the vicinity of his location and the organization to optimally add and allocate the ambulances as per the demands of the patient. The patient can choose the type of ambulances as per the requirement. It has three views: Patient, Organization View, and Super Admin View.<br/><br/>
Code has been written using **JavaScript, CSS and HTML**

**You can find the project here: [Website Deployment](https://github.com/ps428/MOLA/blob/master/README.md#website)**<br/>

# Objective

1. Begin with the [page0_home](https://github.com/ps428/MOLA/blob/master/Code/HTML/page0_home.html), which provides you with the three options of user view, organization view, and super admin view.  You can visit any of them based on your needs.

2. First, we go through the user view, this will make you reach the login page for the user ([page1](https://github.com/ps428/MOLA/blob/master/Code/HTML/page1.html)). Here, you are provided with three options: enter your email id and password, ‘Sign Up!’, and ‘Forgot your password?’. There is also a feature of ‘remember me’ to hold your login details.

3. In the navigation pane, we have ‘About’ ([aboutUs](https://github.com/ps428/MOLA/blob/master/Code/HTML/aboutUs.html)) and ‘Contact Us’ ([contactUs](https://github.com/ps428/MOLA/blob/master/Code/HTML/contactUs.html)) provides the user with the details regarding our software.

4. First, we register a user by going to sign up ([page2_sign_up](https://github.com/ps428/MOLA/blob/master/Code/HTML/page2_sign_up.html)) and providing all the necessary details. Upon registering the user, our database will check whether the user already exists and all the necessary validation regarding each field. After registering, you will go back to the login page and a verification link will be sent to the registered email.

5. You will have to verify yourself first otherwise it will show an alert when you try to log in. After verifying, you can log in which will move you to the main page for the user ([page3_map_user_view](https://github.com/ps428/MOLA/blob/master/Code/HTML/page3_map_user_view.html)).

6. When this page loads up, it requests for you to enable your location. Click on ‘allow’ and the map will load showing all the “available” ambulances near you. When you click on the ambulance of your preference you will see a dialog showing the driver’s name, phone number, and ID of the ambulance. To check how much time, it will take for the ambulance to reach you click ‘Check Distance’ and it will display distance, ETA, and the cost of the ride. Click on ‘Book Now’ to book the ambulance.

7. You will reach the page ([page4_user_booking](https://github.com/ps428/MOLA/blob/master/Code/HTML/page4_user_booking.html)) where it will ask for your location, after selecting ‘allow’ you will see an alert showing your ride has been booked and the details will be shown regarding the booking. 

8. In the navigation bar you can check the status of all the rides you have booked from ‘Your Rides’ ([page5_your_rides](https://github.com/ps428/MOLA/blob/master/Code/HTML/page5_your_rides.html)).

9. Click on ‘Logout’ to log out from your account. For proper authentication, we have enabled the feature, so that no one can log back in after logging out from clicking back only.

10. Now let’s say you forget your password and click on ‘Forgot your Password?’ you will go to the reset password page ([emailVerification](https://github.com/ps428/MOLA/blob/master/Code/HTML/emailVerification.html)) where you will have to insert your email and click ‘Reset’, a reset password link will be sent to your email where you can set a new password. 

11. You will reach the home page by clicking back in the navigation pane.

12. From there we go to the organization view. We arrive at the login page for the organization ([Hospital_login](https://github.com/ps428/MOLA/blob/master/Code/HTML/Hospital_login.html)) which is provided with the same features as the one for the user login page with the slight variation of adding their organization ID during registration. ([Hospital_sign_up](https://github.com/ps428/MOLA/blob/master/Code/HTML/Hospital_sign_up.html)).

13. After logging in, a map will be shown with all the ambulances spread across India registered under the respective hospital ([Hospital_map_view](https://github.com/ps428/MOLA/blob/master/Code/HTML/Hospital_map_view.html)). Upon clicking on an ambulance, you will be able to see the driver’s name their phone number, and the ID for the mentioned ambulance.

14. The Navigation bar is provided with ‘About’, ‘Contact Us’, and ‘Our Providers’ ([ServiceProviders](https://github.com/ps428/MOLA/blob/master/Code/HTML/ServiceProvider.html)) to show a list of all the organizations that are attached to our service.

15. There is also a feature of ‘Add ambulance’ ([organizationAmbulance](https://github.com/ps428/MOLA/blob/master/Code/HTML/organizationAmbulance.html)) where you can insert the necessary details of an ambulance and register it for it to be used by the software.

16. From here you can log out again using ‘Logout’ which has the same features as in user view.

17.   Now we move to our third view that is the super admin view, which is built for the creators of the software. 

18.   You click on ‘Super Admin View’ and reach the login page ([super_admin_login](https://github.com/ps428/MOLA/blob/master/Code/HTML/super_admin_login.html)), provide the email and password, and log in.

19.   When this page loads up ([super_admin_map](https://github.com/ps428/MOLA/blob/master/Code/HTML/super_admin_map.html)) we are able to see ambulances of every hospital in India registered on MOLA. 

20.   In the navigation pane, we have ‘About’, ‘Contact Us’, and ‘Show Bookings’ ([super_admin_booking](https://github.com/ps428/MOLA/blob/master/Code/HTML/super_admin_bookings.html)) where you can see all the bookings made by each customer.

21.   From here we can simply log out using ‘Logout’.

**Online documentation can be seen here:** https://ai-csd313.notion.site/MOLA-MY-ONLINE-LOCAL-AMBULANCE-b800bd84db644a17af8f4272941b12ee <br/><br/>
**Report**: [MOLA Report](https://github.com/ps428/MOLA/blob/master/Code/MOLA%20Report.pdf)

# System Specifications
 
**Platform:** Windows 10 / Linux / MacOS / Android<br/>
**Client-Side Validation:** JavaScript<br/>
**Server-Side Validation:** Firebase<br/>
**Database:** Firebase
 
# Local Setup

## Pre-Requisites
 
1.   An IDE that supports HTML, CSS and JavaScript.
2.   A V8 web browser
 
## Installation and Execution
1. Pull this code into any folder.
2. MOLA->Test Frontend-> HTML -> page0_home.html

# Website
### [https://mola-afb82.firebaseapp.com/](https://mola-afb82.firebaseapp.com/)<br/>

# Contact
## [Pranav Soni](mailto:ps205@snu.edu.in?subject=GitHub)<br/><br/>[Aditya Srivastava](mailto:aditya26052002@gmail.com?subject=GitHub)<br/><br/>[Jayati Sharma](mailto:js880@snu.edu.in?subject=GitHub)<br/><br/>[Madhav Agarwal](mailto:ma699@snu.edu.in?subject=GitHub)<br/><br/>
