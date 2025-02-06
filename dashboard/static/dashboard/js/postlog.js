document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const slideMenu = document.getElementById("slide-menu");

  hamburger.addEventListener("click", function () {
    slideMenu.classList.toggle("open");
    // Toggle active state to animate hamburger button
    hamburger.classList.toggle("active");
  });
});


document.addEventListener('DOMContentLoaded', function() {
  // Get the current page filename (e.g., "reflink.html")
  var currentPage = window.location.pathname.split("/").pop();
  
  // Select all sidebar links
  var sidebarLinks = document.querySelectorAll('.sidebar a');
  
  sidebarLinks.forEach(function(link) {
    // Get the href attribute from the link (should be like "reflink.html")
    var linkHref = link.getAttribute('href');
    
    // If the href matches the current page, mark it as active
    if (linkHref === currentPage) {
      link.classList.add('active');
    }
  });
});


// Funkcja symulująca wysłanie formularza resetu hasła – podmień na właściwą logikę
function sendResetPasswordEmail() {
  var email = document.getElementById('user-email').innerText;
  // Tutaj możesz dodać walidację oraz wysłanie żądania (np. AJAX) do serwera
  alert('Wysłano wiadomość resetującą hasło na adres: ' + email);
}

// Przykładowe dane użytkownika – w realnej implementacji pobierzesz je z backendu
var userData = {
  // Jeśli numer nie jest podpięty, wartość może być pusta lub null
  phone: "", // np. "123-456-789" gdy podpięty
  cardLast4: "1234",
  nextBillingDate: "2025-03-15"
};

document.addEventListener('DOMContentLoaded', function() {
  
  // Ustaw numer telefonu lub komunikat, gdy numer nie jest podpięty
  var phoneInfoElem = document.getElementById('phone-info');
  if (userData.phone && userData.phone.trim() !== "") {
    phoneInfoElem.innerText = userData.phone;
  } else {
    phoneInfoElem.innerText = "Nie masz podpiętego numeru telefonu - zalecamy skonfigurowanie MFA";
  }
  
  // Ustaw dane płatności
  document.getElementById('card-last4').innerText = userData.cardLast4;
  document.getElementById('next-billing-date').innerText = userData.nextBillingDate;
});
