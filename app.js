console.log("Hello from B2S!");

// create the viz variable
let viz;

// grab the vizcontainer element
const vizContainer = document.getElementById("vizContainer")

// the url of the tableau element
const url = 
"https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard"

const url2 = 
"https://public.tableau.com/views/Freeschoolmealsandeducationalattainment/Dashboard"



// options of our dashboard (desktop, width, height, etc.)
const options = {
    device: "desktop",
    hideToolBar: true
    // Tableau public doesn't allow you to hide the toolbar, even with this function
    // they want people to know if a dashboard came from them if it's being displayed in a website or newspaper or something

};

// export to PDF button
const pdfButton = document.getElementById("pdfButton")
pdfButton.addEventListener("click", function(){
    viz.showExportPDFDialog();
    
} )

// export to image button
const imageButton = document.getElementById("imageButton")
imageButton.addEventListener("click", function(){
    viz.showExportPowerPointDialog();
    
} )

// grab the show and hide buttons
const showButton = document.getElementById("showButton")
const hideButton = document.getElementById("hideButton")

// hide the show button by default


// when someone clicks on the hide button, remove the hide button and show the show button
    // 1. Hide the tableau viz
    hideButton.addEventListener("click",function(){
        viz.hide();

    // 2. hide the hide button and show the show button
        showButton.style.display = "inline";
        hideButton.style.display = "none";

    });


// when someone clicks on the show button, show the viz and hide the show button
    // 1. Show the tableau viz
    showButton.addEventListener("click",function(){
        viz.show();

    // 2. Show the hide button and hide the show button
        showButton.style.display = "none";
        hideButton.style.display = "inline";

    });

// loop through filter values
document.querySelectorAll(".filter").forEach(button=>{
    console.log(button);
button.addEventListener("click", e => singleFilter (e.target.value))
});

// function to filter the dashboard to the selected region
function singleFilter(value){
    const sheetToFilter = viz
    .getWorkbook()
    .getActiveSheet()
    .getWorksheets()
    .get("Sales Map");  

    sheetToFilter.applyFilterAsync("Region",
    value,
    tableau.FilterUpdateType.REPLACE)
}

// test button for sheetToFilter
// const centralButton = document.getElementById("centralButton")
// centralButton.addEventListener("click", singleFilter);


// Switch between vizzes
    // listen for a click on the switch viz
    const switchViz = document.getElementById("switchViz")
    switchViz.addEventListener("click",function(){
        // switch vizzes
            if (viz.getUrl() === url){
                initViz(url2);
            } else {
                    initViz(url);
            }
            });
            

// create a function that intialises the dashboard
function initViz(vizURL) {
    if(viz){
        viz.dispose()
    }
    viz = new tableau.Viz(vizContainer, vizURL, options);
    showButton.style.display = "none";
}

// without this the webpage does nothing will all of this content
initViz(url,singleFilter)
