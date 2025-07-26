
// src/pages/Register.jsx
import Lottie from "lottie-react";
import { useContext, useState, useEffect } from "react";
import { BiEnvelope, BiImageAdd, BiKey, BiUser } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import happy from "../assets/happy.json";
import Title from "../components/Title";
import { AuthContext } from "../providers/AuthProvider";
import Swal from 'sweetalert2';
import useAxiosPublic from "../hooks/useAxiosPublic";

// District data (from your previous input)
const districtsData = [
  {"id":"1","name":"Comilla"}, {"id":"2","name":"Feni"}, {"id":"3","name":"Brahmanbaria"},
  {"id":"4","name":"Rangamati"}, {"id":"5","name":"Noakhali"}, {"id":"6","name":"Chandpur"},
  {"id":"7","name":"Lakshmipur"}, {"id":"8","name":"Chattogram"}, {"id":"9","name":"Coxsbazar"},
  {"id":"10","name":"Khagrachhari"}, {"id":"11","name":"Bandarban"}, {"id":"12","name":"Sirajganj"},
  {"id":"13","name":"Pabna"}, {"id":"14","name":"Bogura"}, {"id":"15","name":"Rajshahi"},
  {"id":"16","name":"Natore"}, {"id":"17","name":"Joypurhat"}, {"id":"18","name":"Chapainawabganj"},
  {"id":"19","name":"Naogaon"}, {"id":"20","name":"Jashore"}, {"id":"21","name":"Satkhira"},
  {"id":"22","name":"Meherpur"}, {"id":"23","name":"Narail"}, {"id":"24","name":"Chuadanga"},
  {"id":"25","name":"Kushtia"}, {"id":"26","name":"Magura"}, {"id":"27","name":"Khulna"},
  {"id":"28","name":"Bagerhat"}, {"id":"29","name":"Jhenaidah"}, {"id":"30","name":"Jhalakathi"},
  {"id":"31","name":"Patuakhali"}, {"id":"32","name":"Pirojpur"}, {"id":"33","name":"Barisal"},
  {"id":"34","name":"Bhola"}, {"id":"35","name":"Barguna"}, {"id":"36","name":"Sylhet"},
  {"id":"37","name":"Moulvibazar"}, {"id":"38","name":"Habiganj"}, {"id":"39","name":"Sunamganj"},
  {"id":"40","name":"Narsingdi"}, {"id":"41","name":"Gazipur"}, {"id":"42","name":"Shariatpur"},
  {"id":"43","name":"Narayanganj"}, {"id":"44","name":"Tangail"}, {"id":"45","name":"Kishoreganj"},
  {"id":"46","name":"Manikganj"}, {"id":"47","name":"Dhaka"}, {"id":"48","name":"Munshiganj"},
  {"id":"49","name":"Rajbari"}, {"id":"50","name":"Madaripur"}, {"id":"51","name":"Gopalganj"},
  {"id":"52","name":"Faridpur"}, {"id":"53","name":"Panchagarh"}, {"id":"54","name":"Dinajpur"},
  {"id":"55","name":"Lalmonirhat"}, {"id":"56","name":"Nilphamari"}, {"id":"57","name":"Gaibandha"},
  {"id":"58","name":"Thakurgaon"}, {"id":"59","name":"Rangpur"}, {"id":"60","name":"Kurigram"},
  {"id":"61","name":"Sherpur"}, {"id":"62","name":"Mymensingh"}, {"id":"63","name":"Jamalpur"},
  {"id":"64","name":"Netrokona"}
];

// Upazila data (updated with all provided data)
const upazilasData = {
  "1": ["Debidwar", "Barura", "Brahmanpara", "Chandina", "Chauddagram", "Daudkandi", "Homna", "Laksam", "Muradnagar", "Nangalkot", "Comilla Sadar", "Meghna", "Monohargonj", "Sadarsouth", "Titas", "Burichang", "Lalmai"],
  "2": ["Chhagalnaiya", "Feni Sadar", "Sonagazi", "Fulgazi", "Parshuram", "Daganbhuiyan"],
  "3": ["Brahmanbaria Sadar", "Kasba", "Nasirnagar", "Sarail", "Ashuganj", "Akhaura", "Nabinagar", "Bancharampur", "Bijoynagar"],
  "4": ["Rangamati Sadar", "Kaptai", "Kawkhali", "Baghaichari", "Barkal", "Langadu", "Rajasthali", "Belaichari", "Juraichari", "Naniarchar"],
  "5": ["Noakhali Sadar", "Companiganj", "Begumganj", "Hatia", "Subarnachar", "Kabirhat", "Senbug", "Chatkhil", "Sonaimori"],
  "6": ["Haimchar", "Kachua", "Shahrasti", "Chandpur Sadar", "Matlab South", "Hajiganj", "Matlab North", "Faridgonj"],
  "7": ["Lakshmipur Sadar", "Kamalnagar", "Raipur", "Ramgati", "Ramganj"],
  "8": ["Rangunia", "Sitakunda", "Mirsharai", "Patiya", "Sandwip", "Banshkhali", "Boalkhali", "Anwara", "Chandanaish", "Satkania", "Lohagara", "Hathazari", "Fatikchhari", "Raozan", "Karnafuli"],
  "9": ["Coxsbazar Sadar", "Chakaria", "Kutubdia", "Ukhiya", "Moheshkhali", "Pekua", "Ramu", "Teknaf", "Eidgaon"],
  "10": ["Khagrachhari Sadar", "Dighinala", "Panchari", "Laxmichhari", "Mohalchari", "Manikchari", "Ramgarh", "Matiranga", "Guimara"],
  "11": ["Bandarban Sadar", "Alikadam", "Naikhongchhari", "Rowangchhari", "Lama", "Ruma", "Thanchi"],
  "12": ["Belkuchi", "Chauhali", "Kamarkhand", "Kazipur", "Raigonj", "Shahjadpur", "Sirajganj Sadar", "Tarash", "Ullapara"],
  "13": ["Sujanagar", "Ishurdi", "Bhangura", "Pabna Sadar", "Bera", "Atghoria", "Chatmohar", "Santhia", "Faridpur"],
  "14": ["Kahaloo", "Bogra Sadar", "Shariakandi", "Shajahanpur", "Dupchanchia", "Adamdighi", "Nondigram", "Sonatala", "Dhunot", "Gabtali", "Sherpur", "Shibganj"],
  "15": ["Paba", "Durgapur", "Mohonpur", "Charghat", "Puthia", "Bagha", "Godagari", "Tanore", "Bagmara"],
  "16": ["Natore Sadar", "Singra", "Baraigram", "Bagatipara", "Lalpur", "Gurudaspur", "Naldanga"],
  "17": ["Akkelpur", "Kalai", "Khetlal", "Panchbibi", "Joypurhat Sadar"],
  "18": ["Chapainawabganj Sadar", "Gomostapur", "Nachol", "Bholahat", "Shibganj"],
  "19": ["Mohadevpur", "Badalgachi", "Patnitala", "Dhamoirhat", "Niamatpur", "Manda", "Atrai", "Raninagar", "Naogaon Sadar", "Porsha", "Sapahar"],
  "20": ["Manirampur", "Abhaynagar", "Bagherpara", "Chougachha", "Jhikargacha", "Keshabpur", "Jessore Sadar", "Sharsha"],
  "21": ["Assasuni", "Debhata", "Kalaroa", "Satkhira Sadar", "Shyamnagar", "Tala", "Kaliganj"],
  "22": ["Mujibnagar", "Meherpur Sadar", "Gangni"],
  "23": ["Narail Sadar", "Lohagara", "Kalia"],
  "24": ["Chuadanga Sadar", "Alamdanga", "Damurhuda", "Jibannagar"],
  "25": ["Kushtia Sadar", "Kumarkhali", "Khoksa", "Mirpur", "Daulatpur", "Bheramara"],
  "26": ["Shalikha", "Sreepur", "Magura Sadar", "Mohammadpur"],
  "27": ["Paikgasa", "Fultola", "Digholia", "Rupsha", "Terokhada", "Dumuria", "Botiaghata", "Dakop", "Koyra"],
  "28": ["Fakirhat", "Bagerhat Sadar", "Mollahat", "Sarankhola", "Rampal", "Morrelganj", "Kachua", "Mongla", "Chitalmari"],
  "29": ["Jhenaidah Sadar", "Shailkupa", "Harinakundu", "Kaliganj", "Kotchandpur", "Moheshpur"],
  "30": ["Jhalakathi Sadar", "Kathalia", "Nalchity", "Rajapur"],
  "31": ["Bauphal", "Patuakhali Sadar", "Dumki", "Dashmina", "Kalapara", "Mirzaganj", "Galachipa", "Rangabali"],
  "32": ["Pirojpur Sadar", "Nazirpur", "Kawkhali", "Zianagar", "Bhandaria", "Mathbaria", "Nesarabad"],
  "33": ["Barisal Sadar", "Bakerganj", "Babuganj", "Wazirpur", "Banaripara", "Gournadi", "Agailjhara", "Mehendiganj", "Muladi", "Hizla"],
  "34": ["Bhola Sadar", "Borhan Sddin", "Charfesson", "Doulatkhan", "Monpura", "Tazumuddin", "Lalmohan"],
  "35": ["Amtali", "Barguna Sadar", "Betagi", "Bamna", "Pathorghata", "Taltali"],
  "36": ["Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Sylhet Sadar", "Zakiganj", "Dakshinsurma", "Osmaninagar"],
  "37": ["Barlekha", "Kamolganj", "Kulaura", "Moulvibazar Sadar", "Rajnagar", "Sreemangal", "Juri"],
  "38": ["Nabiganj", "Bahubal", "Ajmiriganj", "Baniachong", "Lakhai", "Chunarughat", "Habiganj Sadar", "Madhabpur"],
  "39": ["Sunamganj Sadar", "South Sunamganj", "Bishwambarpur", "Chhatak", "Jagannathpur", "Dowarabazar", "Tahirpur", "Dharmapasha", "Jamalganj", "Shalla", "Derai", "Madhyanagar"],
  "40": ["Belabo", "Monohardi", "Narsingdi Sadar", "Palash", "Raipura", "Shibpur"],
  "41": ["Kaliganj", "Kaliakair", "Kapasia", "Gazipur Sadar", "Sreepur"],
  "42": ["Shariatpur Sadar", "Naria", "Zajira", "Gosairhat", "Bhedarganj", "Damudya"],
  "43": ["Araihazar", "Bandar", "Narayanganj Sadar", "Rupganj", "Sonargaon"],
  "44": ["Basail", "Bhuapur", "Delduar", "Ghatail", "Gopalpur", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar", "Kalihati", "Dhanbari"],
  "45": ["Itna", "Katiadi", "Bhairab", "Tarail", "Hossainpur", "Pakundia", "Kuliarchar", "Kishoreganj Sadar", "Karimgonj", "Bajitpur", "Austagram", "Mithamoin", "Nikli"],
  "46": ["Harirampur", "Saturia", "Manikganj Sadar", "Gior", "Shibaloy", "Doulatpur", "Singiar"],
  "47": ["Savar", "Dhamrai", "Keraniganj", "Nawabganj", "Dohar"],
  "48": ["Munshiganj Sadar", "Sreenagar", "Sirajdikhan", "Louhajanj", "Gajaria", "Tongibari"],
  "49": ["Rajbari Sadar", "Goalanda", "Pangsa", "Baliakandi", "Kalukhali"],
  "50": ["Madaripur Sadar", "Shibchar", "Kalkini", "Rajoir", "Dasar"],
  "51": ["Gopalganj Sadar", "Kashiani", "Tungipara", "Kotalipara", "Muksudpur"],
  "52": ["Faridpur Sadar", "Alfadanga", "Boalmari", "Sadarpur", "Nagarkanda", "Bhanga", "Charbhadrasan", "Madhukhali", "Saltha"],
  "53": ["Panchagarh Sadar", "Debiganj", "Boda", "Atwari", "Tetulia"],
  "54": ["Nawabganj", "Birganj", "Ghoraghat", "Birampur", "Parbatipur", "Bochaganj", "Kaharol", "Fulbari", "Dinajpur Sadar", "Hakimpur", "Khansama", "Birol", "Chirirbandar"],
  "55": ["Lalmonirhat Sadar", "Kaliganj", "Hatibandha", "Patgram", "Aditmari"],
  "56": ["Syedpur", "Domar", "Dimla", "Jaldhaka", "Kishorganj", "Nilphamari Sadar"],
  "57": ["Sadullapur", "Gaibandha Sadar", "Palashbari", "Saghata", "Gobindaganj", "Sundarganj", "Phulchari"],
  "58": ["Thakurgaon Sadar", "Pirganj", "Ranisankail", "Haripur", "Baliadangi"],
  "59": ["Rangpur Sadar", "Gangachara", "Taragonj", "Badargonj", "Mithapukur", "Pirgonj", "Kaunia", "Pirgacha"],
  "60": ["Kurigram Sadar", "Nageshwari", "Bhurungamari", "Phulbari", "Rajarhat", "Ulipur", "Chilmari", "Rowmari", "Charrajibpur"],
  "61": ["Sherpur Sadar", "Nalitabari", "Sreebordi", "Nokla", "Jhenaigati"],
  "62": ["Fulbaria", "Trishal", "Bhaluka", "Muktagacha", "Mymensingh Sadar", "Dhobaura", "Phulpur", "Haluaghat", "Gouripur", "Gafargaon", "Iswarganj", "Nandail", "Tarakanda"],
  "63": ["Jamalpur Sadar", "Melandah", "Islampur", "Dewangonj", "Sarishabari", "Madarganj", "Bokshiganj"],
  "64": ["Barhatta", "Durgapur", "Kendua", "Atpara", "Madan", "Khaliajuri", "Kalmakanda", "Mohongonj", "Purbadhala", "Netrokona Sadar"]
};


const Register = () => {
  const goTo = useNavigate();
  const location = useLocation();
  const { createUser, setUser, updateUser } = useContext(AuthContext); // Removed signIn as it's not used here directly
  const axiosPublic = useAxiosPublic();

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [availableUpazilas, setAvailableUpazilas] = useState([]);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (selectedDistrict) {
      const districtId = districtsData.find(d => d.name === selectedDistrict)?.id;
      if (districtId && upazilasData[districtId]) {
        setAvailableUpazilas(upazilasData[districtId]);
      } else {
        setAvailableUpazilas([]);
      }
    } else {
      setAvailableUpazilas([]);
    }
  }, [selectedDistrict]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const avatar = form.image.value;
    const email = form.email.value;
    const password = form.pass.value;
    const confirmPassword = form.confirm_pass.value;
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;

    setPasswordError("");

    // Password validation
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      Swal.fire({ icon: 'error', title: 'Registration Failed!', text: 'Password must be at least 6 characters long.' });
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      Swal.fire({ icon: 'error', title: 'Registration Failed!', text: 'Password must contain at least one uppercase letter.' });
      return;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      setPasswordError("Password must contain at least one special character.");
      Swal.fire({ icon: 'error', title: 'Registration Failed!', text: 'Password must contain at least one special character.' });
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      Swal.fire({ icon: 'error', title: 'Registration Failed!', text: 'Passwords do not match.' });
      return;
    }

    try {
      // Create user with Firebase Auth
      const userCredential = await createUser(email, password);

      // Update Firebase user profile with name and photo URL
      await updateUser({ displayName: name, photoURL: avatar });

      // After successful Firebase registration, send user data to your backend
      const userDataForBackend = {
        email: userCredential.user.email,
        name: name,
        avatar: avatar,
        bloodGroup: bloodGroup,
        district: district,
        upazila: upazila,
        // role and status will be set by the backend's /add-user endpoint
      };

      // Send user data to your backend's /add-user endpoint
      const backendResponse = await axiosPublic.post("/add-user", userDataForBackend);
      console.log("Backend user add response:", backendResponse.data);

      // Update AuthContext user state with additional info from Firebase and backend (if needed)
      // The backend /add-user should return the full user object with role and status
      // For now, we assume Firebase has displayName and photoURL, and backend sets role/status
      setUser({
        ...userCredential.user,
        displayName: name,
        photoURL: avatar,
        bloodGroup: bloodGroup, // These fields are now on the user object in AuthContext
        district: district,
        upazila: upazila,
        role: "donor", // Explicitly set role here for immediate UI update, assuming backend confirms
        status: "active", // Explicitly set status here for immediate UI update, assuming backend confirms
      });

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Welcome to the Blood Donation Application!',
      });

      goTo(location.state ? location.state : "/");

    } catch (error) {
      console.error("Registration Error:", error);
      const errorMessage = error.message.includes("auth/email-already-in-use")
        ? "This email is already registered. Please try logging in."
        : "Registration failed. Please try again.";

      Swal.fire({
        icon: 'error',
        title: 'Registration Failed!',
        text: errorMessage,
      });
    }
  };

  return (
    <div className="bg-[url(/bg.png)] bg-contain">
      <div className="bg-white bg-opacity-90 min-h-screen">
        <div className="w-11/12 mx-auto py-10 m-5 p-5">
          <div className="title mt-5">
            <Title>Join with Us</Title>
          </div>

          <div className="flex justify-between items-center gap-5 pt-8 flex-col lg:flex-row">
            <div className="login-for flex-1 w-full lg:w-auto">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-5 flex flex-col gap-6 backdrop-blur-sm bg-opacity-10 shadow-lg rounded-lg max-w-lg mx-auto"
              >
                <h2 className="text-2xl font-semibold text-center text-gray-800">Register New Donor</h2>

                {/* Name */}
                <div className="flex items-center border-b-2 border-gray-300 focus-within:border-orange-400 transition-all duration-200">
                  <BiUser className="text-2xl text-slate-500 mr-2" />
                  <input
                    className="outline-none flex-1 p-2 bg-transparent"
                    type="text"
                    name="name"
                    placeholder="Enter Full Name"
                    required
                  />
                </div>

                {/* Avatar Image URL */}
                <div className="flex items-center border-b-2 border-gray-300 focus-within:border-orange-400 transition-all duration-200">
                  <BiImageAdd className="text-2xl text-slate-500 mr-2" />
                  <input
                    className="outline-none flex-1 p-2 bg-transparent"
                    type="text"
                    name="image"
                    placeholder="Enter Avatar Image URL (ImageBB)"
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex items-center border-b-2 border-gray-300 focus-within:border-orange-400 transition-all duration-200">
                  <BiEnvelope className="text-2xl text-slate-500 mr-2" />
                  <input
                    className="outline-none flex-1 p-2 bg-transparent"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    required
                  />
                </div>

                {/* Blood Group */}
                <div>
                  <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                {/* District */}
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <select
                    id="district"
                    name="district"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    required
                  >
                    <option value="">Select District</option>
                    {districtsData.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                {/* Upazila */}
                <div>
                  <label htmlFor="upazila" className="block text-sm font-medium text-gray-700 mb-1">Upazila</label>
                  <select
                    id="upazila"
                    name="upazila"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!selectedDistrict}
                    required
                  >
                    <option value="">Select Upazila</option>
                    {availableUpazilas.map((u, index) => (
                      <option key={index} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                {/* Password */}
                <div className="flex items-center border-b-2 border-gray-300 focus-within:border-orange-400 transition-all duration-200">
                  <BiKey className="text-2xl text-slate-500 mr-2" />
                  <input
                    className="outline-none flex-1 p-2 bg-transparent"
                    type="password"
                    name="pass"
                    placeholder="Enter Password"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="flex items-center border-b-2 border-gray-300 focus-within:border-orange-400 transition-all duration-200">
                  <BiKey className="text-2xl text-slate-500 mr-2" />
                  <input
                    className="outline-none flex-1 p-2 bg-transparent"
                    type="password"
                    name="confirm_pass"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}


                <input
                  type="submit"
                  value="Register Now"
                  className="btn cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                />
                <p className="text-center text-gray-600 text-sm">
                  Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
                </p>
              </form>
            </div>
            <div className="lottie flex-1 flex mx-20 hidden lg:block">
              <Lottie animationData={happy} loop={true}></Lottie>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;