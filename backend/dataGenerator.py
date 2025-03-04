import json
import random

def generate_college_data(colleges, branches):
    college_data = []
    
    for college in colleges:
        num_branches = random.randint(6, 13)  
        selected_branches = random.sample(branches, num_branches)
        

        college_entry = {
            "tag": college["tag"],
            "collegeId": college["collegeId"],
            "collegeName": college["collegeName"],
            "address": {
                "city": college["address"]["city"],
                "state": college["address"]["state"]
            },
            "branches": [],
            "restrictions": { "pwd": random.choice([True, False]) },
        }
        
        for branch in selected_branches:
            branch_entry = {
                "branchDetails": {
                    "branchId": branch["branchId"],
                    "branchName": branch["branchName"],
                    "duration": branch["duration"],
                    "description": branch["description"],
                    "restrictions": { "pwd": random.choice([True, False]), "other": "" }
                },
                "otherState": {},
                "homeState": {}
            }
            
            categories = ["gen", "obc", "ews", "sc", "st"]
            years = [2025, 2024, 2023, 2022]
            
            for category in categories:
                branch_entry["otherState"][category] = []
                branch_entry["homeState"][category] = []
                
                for year in years:
                    seats = random.randint(400, 1000)
                    
                    opening_rank = random.randint(1, 1000000) if year != 2025 else None
                    randNum = random.randint(10000, 20000)
                    closing_rank = random.randint(opening_rank + randNum, opening_rank + randNum) if year != 2025 else None
                    
                    branch_entry["otherState"][category].append({
                        "year": year,
                        "totalSeats": seats,
                        "openingRank": opening_rank,
                        "closingRank": closing_rank
                    })
                    
                    branch_entry["homeState"][category].append({
                        "year": year,
                        "totalSeats": seats,
                        "openingRank": opening_rank,
                        "closingRank": closing_rank
                    })
            
            college_entry["branches"].append(branch_entry)
        
        college_data.append(college_entry)
    
    with open("college_data.json", "w") as json_file:
        json.dump(college_data, json_file, indent=2)

colleges = [
    {"tag":"iit","collegeId": "iitkgp", "collegeName": "Indian Institute of Technology Kharagpur", "address": {"city": "Kharagpur", "state": "West Bengal"}},
    {"tag":"iit","collegeId": "iitb", "collegeName": "Indian Institute of Technology Bombay", "address": {"city": "Mumbai", "state": "Maharashtra"}},
    {"tag":"iit","collegeId": "iitm", "collegeName": "Indian Institute of Technology Madras", "address": {"city": "Chennai", "state": "Tamil Nadu"}},
    {"tag":"iit","collegeId": "iitk", "collegeName": "Indian Institute of Technology Kanpur", "address": {"city": "Kanpur", "state": "Uttar Pradesh"}},
    {"tag":"iit","collegeId": "iitd", "collegeName": "Indian Institute of Technology Delhi", "address": {"city": "New Delhi", "state": "Delhi"}},
    {"tag":"iit","collegeId": "iitg", "collegeName": "Indian Institute of Technology Guwahati", "address": {"city": "Guwahati", "state": "Assam"}},
    {"tag":"iit","collegeId": "iitr", "collegeName": "Indian Institute of Technology Roorkee", "address": {"city": "Roorkee", "state": "Uttarakhand"}},
    {"tag":"iit","collegeId": "iitbbs", "collegeName": "Indian Institute of Technology Bhubaneswar", "address": {"city": "Bhubaneswar", "state": "Odisha"}},
    {"tag":"iit","collegeId": "iitgn", "collegeName": "Indian Institute of Technology Gandhinagar",  "address": {"city": "Gandhinagar", "state": "Gujarat"}},
    {"tag":"iit","collegeId": "iith", "collegeName": "Indian Institute of Technology Hyderabad", "address": {"city": "Hyderabad", "state": "Telangana"}},
    {"tag":"iit","collegeId": "iitj", "collegeName": "Indian Institute of Technology Jodhpur", "address": {"city": "Jodhpur", "state": "Rajasthan"}},
    {"tag":"iit","collegeId": "iitp", "collegeName": "Indian Institute of Technology Patna", "address": {"city": "Patna", "state": "Bihar"}},
    {"tag":"iit","collegeId": "iitrpr", "collegeName": "Indian Institute of Technology Ropar", "address": {"city": "Ropar", "state": "Punjab"}},
    {"tag":"iit","collegeId": "iiti", "collegeName": "Indian Institute of Technology Indore", "address": {"city": "Indore", "state": "Madhya Pradesh"}},
    {"tag":"iit","collegeId": "iitmnd", "collegeName": "Indian Institute of Technology Mandi", "address": {"city": "Mandi", "state": "Himachal Pradesh"}},
    {"tag":"iit","collegeId": "iitbhu", "collegeName": "Indian Institute of Technology (BHU) Varanasi", "address": {"city": "Varanasi", "state": "Uttar Pradesh"}},
    {"tag":"iit","collegeId": "iitpkd", "collegeName": "Indian Institute of Technology Palakkad", "address": {"city": "Palakkad", "state": "Kerala"}},
    {"tag":"iit","collegeId": "iittp", "collegeName": "Indian Institute of Technology Tirupati",  "address": {"city": "Tirupati", "state": "Andhra Pradesh"}},
    {"tag":"iit","collegeId": "iitism", "collegeName": "Indian Institute of Technology (ISM) Dhanbad", "address": {"city": "Dhanbad", "state": "Jharkhand"}},
    {"tag":"iit","collegeId": "iitbh", "collegeName": "Indian Institute of Technology Bhilai",  "address": {"city": "Bhilai", "state": "Chhattisgarh"}},
    {"tag":"iit","collegeId": "iitgoa", "collegeName": "Indian Institute of Technology Goa", "address": {"city": "Farmagudi", "state": "Goa"}},
    {"tag":"iit","collegeId": "iitjmu", "collegeName": "Indian Institute of Technology Jammu",  "address": {"city": "Jammu", "state": "Jammu and Kashmir"}},
    {"tag":"iit","collegeId": "iitdh", "collegeName": "Indian Institute of Technology Dharwad",  "address": {"city": "Dharwad", "state": "Karnataka"}},
    {"tag":"nit","collegeId": "nit_agartala", "collegeName": "National Institute of Technology Agartala", "address": {"city": "Agartala", "state": "Tripura"}},
    {"tag":"nit","collegeId": "nit_ap", "collegeName": "National Institute of Technology Andhra Pradesh", "address": {"city": "Tadepalligudem", "state": "Andhra Pradesh"}},
    {"tag":"nit","collegeId": "nit_arunachal", "collegeName": "National Institute of Technology Arunachal Pradesh","address": {"city": "Yupia", "state": "Arunachal Pradesh"}},
    {"tag":"nit","collegeId": "nit_bhopal", "collegeName": "Maulana Azad National Institute of Technology Bhopal","address": {"city": "Bhopal", "state": "Madhya Pradesh"}},
    {"tag":"nit","collegeId": "nit_calicut", "collegeName": "National Institute of Technology Calicut", "address": {"city": "Calicut", "state": "Kerala"}},
    {"tag":"nit","collegeId": "nit_delhi", "collegeName": "National Institute of Technology Delhi",  "address": {"city": "New Delhi", "state": "Delhi"}},
    {"tag":"nit","collegeId": "nit_dgp", "collegeName": "National Institute of Technology Durgapur",  "address": {"city": "Durgapur", "state": "West Bengal"}},
    {"tag":"nit","collegeId": "nit_goa", "collegeName": "National Institute of Technology Goa",  "address": {"city": "Ponda", "state": "Goa"}},
    {"tag":"nit","collegeId": "nit_hamirpur", "collegeName": "National Institute of Technology Hamirpur", "address": {"city": "Hamirpur", "state": "Himachal Pradesh"}},
    {"tag":"nit","collegeId": "nit_jaipur", "collegeName": "Malaviya National Institute of Technology Jaipur", "address": {"city": "Jaipur", "state": "Rajasthan"}},
    {"tag":"nit","collegeId": "nit_jalandhar", "collegeName": "Dr. B R Ambedkar National Institute of Technology Jalandhar", "address": {"city": "Jalandhar", "state": "Punjab"}},
    {"tag":"nit","collegeId": "nit_jsr", "collegeName": "National Institute of Technology Jamshedpur",  "address": {"city": "Jamshedpur", "state": "Jharkhand"}},
    {"tag":"nit","collegeId": "nit_kkr", "collegeName": "National Institute of Technology Kurukshetra",  "address": {"city": "Kurukshetra", "state": "Haryana"}},
    {"tag":"nit","collegeId": "nit_manipur", "collegeName": "National Institute of Technology Manipur", "address": {"city": "Imphal", "state": "Manipur"}},
    {"tag":"nit","collegeId": "nit_meghalaya", "collegeName": "National Institute of Technology Meghalaya", "address": {"city": "Shillong", "state": "Meghalaya"}},
    {"tag":"nit","collegeId": "nit_mizoram", "collegeName": "National Institute of Technology Mizoram", "address": {"city": "Aizawl", "state": "Mizoram"}},
    {"tag":"nit","collegeId": "nit_nagaland", "collegeName": "National Institute of Technology Nagaland", "address": {"city": "Dimapur", "state": "Nagaland"}},
    {"tag":"nit","collegeId": "nit_patna", "collegeName": "National Institute of Technology Patna", "address": {"city": "Patna", "state": "Bihar"}},
    {"tag":"nit","collegeId": "nit_puducherry", "collegeName": "National Institute of Technology Puducherry", "address": {"city": "Karaikal", "state": "Puducherry"}},
    {"tag":"nit","collegeId": "nit_raipur", "collegeName": "National Institute of Technology Raipur", "address": {"city": "Raipur", "state": "Chhattisgarh"}},
    {"tag":"nit","collegeId": "nit_rkl", "collegeName": "National Institute of Technology Rourkela",  "address": {"city": "Rourkela", "state": "Odisha"}},
    {"tag":"nit","collegeId": "nit_sikkim", "collegeName": "National Institute of Technology Sikkim", "address": {"city": "Ravangla", "state": "Sikkim"}},
    {"tag":"nit","collegeId": "nit_silchar", "collegeName": "National Institute of Technology Silchar", "address": {"city": "Silchar", "state": "Assam"}},
    {"tag":"nit","collegeId": "nit_srinagar", "collegeName": "National Institute of Technology Srinagar", "address": {"city": "Srinagar", "state": "Jammu & Kashmir"}},
    {"tag":"nit","collegeId": "nit_surat", "collegeName": "Sardar Vallabhbhai National Institute of Technology Surat", "address": {"city": "Surat", "state": "Gujarat"}},
    {"tag":"nit","collegeId": "nit_surathkal", "collegeName": "National Institute of Technology Karnataka", "address": {"city": "Surathkal", "state": "Karnataka"}},
    {"tag":"nit","collegeId": "nit_trichy", "collegeName": "National Institute of Technology Tiruchirappalli", "address": {"city": "Tiruchirappalli", "state": "Tamil Nadu"}},
    {"tag":"nit","collegeId": "nit_uk", "collegeName": "National Institute of Technology Uttarakhand", "address": {"city": "Srinagar", "state": "Uttarakhand"}},
    {"tag":"nit","collegeId": "nit_warangal", "collegeName": "National Institute of Technology Warangal", "address": {"city": "Warangal", "state": "Telangana"}},
    {"tag":"nit","collegeId": "nit_nagpur", "collegeName": "Visvesvaraya National Institute of Technology Nagpur", "address": {"city": "Nagpur", "state": "Maharashtra"}},
    {"tag":"iiit","collegeId": "iiita", "collegeName": "Indian Institute of Information Technology Allahabad", "address": {"city": "Allahabad", "state": "Uttar Pradesh"}},
    {"tag":"iiit","collegeId": "iiitg", "collegeName": "Indian Institute of Information Technology Gwalior", "address": {"city": "Gwalior", "state": "Madhya Pradesh"}},
    {"tag":"iiit","collegeId": "iiitj", "collegeName": "Indian Institute of Information Technology Jabalpur", "address": {"city": "Jabalpur", "state": "Madhya Pradesh"}},
    {"tag":"iiit","collegeId": "iiitk", "collegeName": "Indian Institute of Information Technology Kancheepuram", "address": {"city": "Kancheepuram", "state": "Tamil Nadu"}},
    {"tag":"iiit","collegeId": "iiitkn", "collegeName": "Indian Institute of Information Technology Kurnool",  "address": {"city": "Kurnool", "state": "Andhra Pradesh"}},
    {"tag":"iiit","collegeId": "iiitky", "collegeName": "Indian Institute of Information Technology Kottayam",  "address": {"city": "Kottayam", "state": "Kerala"}},
    {"tag":"iiit","collegeId": "iiitl", "collegeName": "Indian Institute of Information Technology Lucknow", "address": {"city": "Lucknow", "state": "Uttar Pradesh"}},
    {"tag":"iiit","collegeId": "iiitdwd", "collegeName": "Indian Institute of Information Technology Dharwad", "address": {"city": "Dharwad", "state": "Karnataka"}},
    {"tag":"iiit","collegeId": "iiitp", "collegeName": "Indian Institute of Information Technology Pune", "address": {"city": "Pune", "state": "Maharashtra"}},
    {"tag":"iiit","collegeId": "iiitn", "collegeName": "Indian Institute of Information Technology Nagpur", "address": {"city": "Nagpur", "state": "Maharashtra"}},
    {"tag":"iiit","collegeId": "iiitr", "collegeName": "Indian Institute of Information Technology Ranchi", "address": {"city": "Ranchi", "state": "Jharkhand"}},
    {"tag":"iiit","collegeId": "iiitbh", "collegeName": "Indian Institute of Information Technology Bhagalpur",  "address": {"city": "Bhagalpur", "state": "Bihar"}},
    {"tag":"iiit","collegeId": "iiitbp", "collegeName": "Indian Institute of Information Technology Bhopal",  "address": {"city": "Bhopal", "state": "Madhya Pradesh"}},
    {"tag":"iiit","collegeId": "iiits", "collegeName": "Indian Institute of Information Technology Surat", "address": {"city": "Surat", "state": "Gujarat"}},
    {"tag":"iiit","collegeId": "iiitu", "collegeName": "Indian Institute of Information Technology Una", "address": {"city": "Una", "state": "Himachal Pradesh"}},
    {"tag":"iiit","collegeId": "iiitv", "collegeName": "Indian Institute of Information Technology Vadodara", "address": {"city": "Vadodara", "state": "Gujarat"}},
    {"tag":"iiit","collegeId": "iiitsn", "collegeName": "Indian Institute of Information Technology Sonepat",  "address": {"city": "Sonepat", "state": "Haryana"}},
    {"tag":"iiit","collegeId": "iiitt", "collegeName": "Indian Institute of Information Technology Tiruchirappalli", "address": {"city": "Tiruchirappalli", "state": "Tamil Nadu"}},
    {"tag":"iiit","collegeId": "iiitra", "collegeName": "Indian Institute of Information Technology Raichur",  "address": {"city": "Raichur", "state": "Karnataka"}},
    {"tag":"iiit","collegeId": "iiitkl", "collegeName": "Indian Institute of Information Technology Kalyani",  "address": {"city": "Kalyani", "state": "West Bengal"}},
    {"tag":"iiit","collegeId": "iiitmn", "collegeName": "Indian Institute of Information Technology Manipur",  "address": {"city": "Imphal", "state": "Manipur"}},
    {"tag":"iiit","collegeId": "iiitsc", "collegeName": "Indian Institute of Information Technology Sri City",  "address": {"city": "Sri City", "state": "Andhra Pradesh"}},
    {"tag":"iiit","collegeId": "iiitkota", "collegeName": "Indian Institute of Information Technology Kota", "address": {"city": "Kota", "state": "Rajasthan"}},
    {"tag":"iiit","collegeId": "iiitag", "collegeName": "Indian Institute of Information Technology Agartala",  "address": {"city": "Agartala", "state": "Tripura"}},
    {"tag":"iiit","collegeId": "iiitaur", "collegeName": "Indian Institute of Information Technology Aurangabad","address": {"city": "Aurangabad", "state": "Maharashtra"}},
  {
    "tag":"gfti",
    "collegeId": "bitmesra",
    "collegeName": "Birla Institute of Technology, Mesra",
        "address": {
      "city": "Ranchi",
      "state": "Jharkhand"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "gkvharidwar",
    "collegeName": "Gurukula Kangri Vishwavidyalaya",
   
        "address": {
      "city": "Haridwar",
      "state": "Uttarakhand"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "iictbhadohi",
    "collegeName": "Indian Institute of Carpet Technology",
   
        "address": {
      "city": "Bhadohi",
      "state": "Uttar Pradesh"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "iitram",
    "collegeName": "Institute of Infrastructure, Technology, Research and Management",
    "address": {
      "city": "Gurugram",
      "state": "Haryana"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "itggvbilaspur",
    "collegeName": "Institute of Technology, Guru Ghasidas Vishwavidyalaya",
  
        "address": {
      "city": "Bilaspur",
      "state": "Chhattisgarh"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "smvdkatra",
    "collegeName": "Shri Mata Vaishno Devi University",

        "address": {
      "city": "Katra",
      "state": "Jammu and Kashmir"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "iirnairaipur",
    "collegeName": "International Institute of Information Technology, Naya Raipur",
   
        "address": {
      "city": "Naya Raipur",
      "state": "Chhattisgarh"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "uohyd",
    "collegeName": "University of Hyderabad",
            "address": {
      "city": "Hyderabad",
      "state": "Telangana"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "pecchandigarh",
    "collegeName": "Punjab Engineering College",

        "address": {
      "city": "Chandigarh",
      "state": "Chandigarh"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "iiitbhubaneswar",
    "collegeName": "International Institute of Information Technology, Bhubaneswar",

        "address": {
      "city": "Bhubaneswar",
      "state": "Odisha"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "citkokrajhar",
    "collegeName": "Central Institute of Technology, Kokrajhar",

        "address": {
      "city": "Kokrajhar",
      "state": "Assam"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "cuitpuducherry",
    "collegeName": "Puducherry Technological University",
   
        "address": {
      "city": "Puducherry",
      "state": "Puducherry"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "gkciectmalda",
    "collegeName": "Ghani Khan Choudhary Institute of Engineering & Technology",
   
        "address": {
      "city": "Malda",
      "state": "West Bengal"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "curaj",
    "collegeName": "Central University of Rajasthan",
            "address": {
      "city": "Ajmer",
      "state": "Rajasthan"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "niftsonipat",
    "collegeName": "National Institute of Food Technology Entrepreneurship and Management",
    
        "address": {
      "city": "Sonepat",
      "state": "Haryana"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "niftthanjavur",
    "collegeName": "National Institute of Food Technology, Entrepreneurship and Management",
  
        "address": {
      "city": "Thanjavur",
      "state": "Tamil Nadu"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "neeristitanagar",
    "collegeName": "North Eastern Regional Institute of Science and Technology",
   
        "address": {
      "city": "Itanagar",
      "state": "Arunachal Pradesh"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "iiitv",
    "collegeName": "Indian Institute of Handloom Technology",
            "address": {
      "city": "Varanasi",
      "state": "Uttar Pradesh"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "csutbilaspur",
    "collegeName": "Chhattisgarh Swami Vivekanand Technical University",

        "address": {
      "city": "Bhilai",
      "state": "Chhattisgarh"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "iiitdhn",
    "collegeName": "Institute of Chemical Technology, Mumbai",
        "address": {
      "city": "Mumbai",
      "state": "Maharashtra"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "iiitsrinagar",
    "collegeName": "Sant Longowal Institute of Engineering and Technology",

        "address": {
      "city": "Longowal",
      "state": "Punjab"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "iitbhu",
    "collegeName": "Indian Institute of Technology, BHU Varanasi",
        "address": {
      "city": "Varanasi",
      "state": "Uttar Pradesh"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "iiitdmj",
    "collegeName": "Indian Institute of Information Technology, Design and Manufacturing, Jabalpur",
        "address": {
      "city": "Jabalpur",
      "state": "Madhya Pradesh"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "iiitdmk",
    "collegeName": "Indian Institute of Information Technology, Design and Manufacturing, Kancheepuram",
        "address": {
      "city": "Kancheepuram",
      "state": "Tamil Nadu"
    }
  },
  {
    "tag":"gfti",
    "collegeId": "iitdhanbad",
    "collegeName": "Indian Institute of Technology (ISM), Dhanbad",
    "address": {
      "city": "Dhanbad",
      "state": "Jharkhand"
    }
  }
    

]


branches = [
    {"branchId": "aerospace", "branchName": "Aerospace Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "agriculture", "branchName": "Agricultural Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "biotech", "branchName": "Biotechnology Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "chemical", "branchName": "Chemical Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "civil", "branchName": "Civil Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "cse", "branchName": "Computer Science and Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "electrical", "branchName": "Electrical Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "ece", "branchName": "Electronics and Communication Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "engg_physics", "branchName": "Engineering Physics", "duration": 4, "description": "B.Tech"},
    {"branchId": "env_engg", "branchName": "Environmental Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "it", "branchName": "Information Technology", "duration": 4, "description": "B.Tech"},
    {"branchId": "mechanical", "branchName": "Mechanical Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "metallurgical", "branchName": "Metallurgical and Materials Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "mining", "branchName": "Mining Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "naval_architecture", "branchName": "Naval Architecture and Ocean Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "industrial", "branchName": "Production and Industrial Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "robotics", "branchName": "Robotics Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "software", "branchName": "Software Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "textile", "branchName": "Textile Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "petroleum", "branchName": "Petroleum Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "instrumentation", "branchName": "Instrumentation and Control Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "industrial_engg", "branchName": "Industrial Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "materials_science", "branchName": "Materials Science and Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "biomedical", "branchName": "Biomedical Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "pharma", "branchName": "Pharmaceutical Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "energy", "branchName": "Energy Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "env_science", "branchName": "Environmental Science and Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "applied_geology", "branchName": "Applied Geology", "duration": 4, "description": "B.Tech"},
    {"branchId": "data_science", "branchName": "Data Science and Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "ai_ml", "branchName": "Artificial Intelligence and Machine Learning", "duration": 4, "description": "B.Tech"},
    {"branchId": "cybersecurity", "branchName": "Cybersecurity", "duration": 4, "description": "B.Tech"},
    {"branchId": "design", "branchName": "Design Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "renewable_energy", "branchName": "Renewable Energy Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "automobile", "branchName": "Automobile Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "food_tech", "branchName": "Food Technology", "duration": 4, "description": "B.Tech"},
    {"branchId": "agri_food", "branchName": "Agricultural and Food Engineering", "duration": 4, "description": "B.Tech"},
    {"branchId": "nanotech", "branchName": "Nanotechnology", "duration": 4, "description": "B.Tech"},



    {"branchId": "cse_dual", "branchName":"Computer Science and Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "electrical_dual", "branchName":"Electrical Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "mechanical_dual", "branchName":"Mechanical Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "aerospace_dual", "branchName":"Aerospace Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "biotech_dual", "branchName":"Biotechnology Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "chemical_dual", "branchName":"Chemical Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "civil_dual", "branchName":"Civil Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "it_dual", "branchName":"Information Technology", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "ec_dual", "branchName":"Electronics and Communication Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "engg_physics_dual", "branchName":"Engineering Physics", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "env_engg_dual", "branchName":"Environmental Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "robotics_dual", "branchName":"Robotics Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "metallurgical_dual", "branchName":"Metallurgical and Materials Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "industrial_engg_dual", "branchName":"Industrial Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "data_science_dual", "branchName":"Data Science and Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "ai_ml_dual", "branchName":"Artificial Intelligence and Machine Learning", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "software_dual", "branchName":"Software Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "electronics_dual", "branchName":"Electronics Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    {"branchId": "renewable_energy_dual", "branchName":"Renewable Energy Engineering", "duration": 5, "description": "Dual Degree(B.Tech + M.Tech)"},
    
    {"branchId": "cse_mba", "branchName":"Computer Science and Engineering", "duration": 5, "description": "Dual Degree(B.Tech + MBA)"},
    {"branchId": "electrical_mba", "branchName":"Electrical Engineering", "duration": 5, "description": "Dual Degree(B.Tech + MBA)"},
    {"branchId": "mechanical_mba", "branchName":"Mechanical Engineering", "duration": 5, "description": "Dual Degree(B.Tech + MBA)"},
    {"branchId": "civil_mba", "branchName":"Civil Engineering", "duration": 5, "description": "Dual Degree(B.Tech + MBA)"},
    {"branchId": "it_mba", "branchName":"Information Technology", "duration": 5, "description": "Dual Degree(B.Tech + MBA)"},
    {"branchId": "ec_mba", "branchName":"Electronics and Communication Engineering", "duration": 5, "description": "Dual Degree(B.Tech + MBA)"},
    {"branchId": "industrial_mba", "branchName":"Industrial Engineering", "duration": 5, "description": "Dual Degree(B.Tech + MBA)"},
    {"branchId": "data_science_mba", "branchName":"Data Science and Engineering", "duration": 5, "description": "Dual Degree(B.Tech + MBA)"},
    {"branchId": "ai_ml_mba", "branchName":"Artificial Intelligence and Machine Learning", "duration": 5, "description": "Dual Degree(B.Tech + MBA)"},
    {"branchId": "software_mba", "branchName":"Software Engineering", "duration": 5, "description": "Dual Degree(B.Tech + MBA)"},
    {"branchId": "renewable_energy_mba", "branchName":"Renewable Energy Engineering", "duration": 5, "description": "Dual Degree(B.Tech + MBA)"},
    {"branchId": "robotics_mba", "branchName":"Robotics Engineering", "duration": 5, "description": "Dual Degree(B.Tech + MBA)"},
    {"branchId": "metallurgical_mba", "branchName":"Metallurgical and Materials Engineering", "duration": 5, "description": "Dual Degree(B.Tech + MBA)"}


]


generate_college_data(colleges, branches)
print("done")
