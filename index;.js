import express from "express";
import axios from "axios"

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", {
        cocktail: null,
        error: null
    });
});

app.get("/search", async(req, res) => {
    const name = req.query.name;

    try {
        const response = await axios.get(
            "https://www.thecocktaildb.com/api/json/v1/1/search.php",
            {
                params: {
                    s: name
                }
            }
        );
        if (!response.data.drinks) {
            return res.render("index", {
                cocktail: null,
                error: "No cocktail found with that name. Please try another."
            });
        }
        const cocktail = response.data.drinks[0];

        res.render("index", {
            cocktail: cocktail,
            error: null
        });
    } catch (error) {
        console.error(error);

        res.render("index", {
            cocktail: null,
            error: "Unable to retrieve information. Please try again."
        });
    }
});

app.listen(port, () => {
    console.log(`Servver running on port ${port}.`);
})