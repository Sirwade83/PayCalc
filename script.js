function Calculate() {
var StartHour = +document.getElementById("StartHour").value; 
var StartMin = +document.getElementById("StartMin").value;
var EndHour = +document.getElementById("EndHour").value; 
var EndMin= +document.getElementById("EndMin").value;
// help with drop down getting values 
// https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-  -->
var element = document.getElementById("AMPMStart");
var AMPMStart = parseInt(element.options[element.selectedIndex].value, 10);
var element = document.getElementById("AMPMEnd");
var AMPMEnd = parseInt(element.options[element.selectedIndex].value, 10);
var RealEndHour = EndHour; // Save Ending Hour before adding 12 
    
    if ( AMPMStart == 0 && AMPMEnd == 12 & EndHour != 12) { EndHour +=12;}; // If AM To PM Add 12 unless it is Noon
    if (StartHour == 12 && AMPMStart == 12) {EndHour +=12} // Adjust if Start is 12 PM
  
  var TotalEndMin = (EndHour * 60) + EndMin;
  var TotalStartMin = (StartHour * 60) + StartMin;
  var TotalMin = TotalEndMin - TotalStartMin
  if (TotalMin < 60 && TotalMin > 0) {TotalMin = 60} // Set Min Dollars to $18
  
  var AddMin= 0;
  var AddMin= (TotalMin % 15 >= 5) ? 15 - (TotalMin % 15): (TotalMin % 15) * -1; //Round to the nearest 15
  TotalMin += AddMin;
  
  var TotalDollar = ((TotalMin / 60) * 18) // $18 dollars and hour
  
var MorningExtra = 0;
var NightExtra = 0;
  if (StartHour < 8 && AMPMStart == 0 ) { MorningExtra =  (8 * 60) - ((StartHour * 60) + StartMin); }; // Only the part Before 8 AM is $20
    if (StartHour < 8 && EndHour <  8 && AMPMStart == 0 && AMPMEnd == 0 ) {MorningExtra = (TotalDollar / 18) *60; }; // if bolth times are before 8 AM - $20 for the full time
     
  var MorningExtraMin = (MorningExtra % 15 >= 5) ? 15 - (MorningExtra % 15): (MorningExtra % 15) * -1; // Round to the nearest 15
      MorningExtra += MorningExtraMin;
      MorningExtra = ((MorningExtra / 60) * 2);
      if (MorningExtra < 0) { MorningExtra = 0 };
    if (RealEndHour >= 5 && AMPMEnd == 12 & RealEndHour != 12) { NightExtra = (RealEndHour * 60) - (5 * 60) + EndMin; }; // Only the part After 5 PM is $20 
    
    if(EndHour >= 5 && StartHour >= 5 && AMPMStart == 12 && AMPMEnd == 12 & StartHour != 12){ NightExtra = (TotalDollar / 18) *60 } // If bolth times are after 5 Pm then the full time is $20
    
  var NightExtraMin = (NightExtra % 15 >= 5) ? 15 - (NightExtra % 15): (NightExtra % 15) * -1;
      NightExtra += NightExtraMin;
      NightExtra = ((NightExtra / 60) * 2);
      if (NightExtra < 0) { NightExtra = 0 };
 
  if ( AMPMStart == 12 && AMPMEnd == 0) { TotalDollar = 0;}; // If PM To AM Show Error:
var RegularHours = TotalDollar / 18;
TotalDollar = TotalDollar  + MorningExtra + NightExtra; // Add Morning and Night extra Minues
// If no money, Not a number, after 10 PM, before 6 AM shows an error! 
var newstring = ( (TotalDollar <= 0) || (StartHour == 0 || RealEndHour == 0) || (AMPMStart == 12 && AMPMEnd == 12 && RealEndHour == 12) || (RealEndHour  > 9 && AMPMEnd == 12 && RealEndHour != 12) || (StartHour < 6 && AMPMStart == 0) || (TotalDollar != TotalDollar) || (StartHour == 12 && AMPMStart == 0) || (RealEndHour == 12 && AMPMEnd == 0) || (StartHour < 0) || (StartHour > 12) || (Number.isInteger(StartHour) == false) || (RealEndHour < 0) || (RealEndHour > 12) || (Number.isInteger(RealEndHour) == false ) || (StartMin < 0) || (StartMin > 59) || (Number.isInteger(StartMin) == false ) || (EndMin < 0) || (EndMin > 59) || (Number.isInteger(EndMin) == false)) ? "ERROR Check the times": 
 "$" + TotalDollar.toFixed(2);
 
 document.getElementById("Answer").innerHTML = newstring;
 
 if (newstring.indexOf('$') > -1) {
 document.getElementById("BreakDown").innerHTML = "(Regular Hours: " + RegularHours +")"
 if (MorningExtra > 0) { 
 document.getElementById("BreakDown").innerHTML += " (Morning Hours: " + MorningExtra / 2 + ")"}
if (NightExtra > 0) {
document.getElementById("BreakDown").innerHTML += " (Night Hours: " + NightExtra / 2 + ")"}" (Night Hours " + NightExtra / 2 + ")" 
} 
else {document.getElementById("BreakDown").innerHTML = ""}
}
