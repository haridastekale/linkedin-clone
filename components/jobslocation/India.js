import React from 'react';
import cheerio from "cheerio";
import axios from "axios";



class India extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      Injobsdata: [],
    }
  }

  refreshList() {
    axios.get("https://cors-anywhere.herokuapp.com/https://in.linkedin.com/jobs/search?keywords=&location=Mumbai&geoId=&trk=people-guest_jobs-search-bar_search-submit&position=1&pageNum=0" || "http://localhost:3000/")
      .then(html => {
        const Injobsdata = [];
        const $ = cheerio.load(html.data);

        $("div.base-search-card__metadata").each((_i, element) => {
          let Injobs = {};;
        //   const photo = $(element)
        //     .prepend()
        //     // .find("div.h2Zk0d")
        //     // .find("div.x1z8cb")
        //     .find("g-img.pJ3Uqf")
        //     .find("img.rISBZc")
        //     .attr("src");
        // Injobs.photo = photo;

        //   const link = $(element)
        //     .prepend()
        //     .find("div.ThumbImg")
        //     .find("a.noPadding")
        //     .attr("href");
        //   crime.link = "https://www.deccanchronicle.com/" + link;


          const header = $(element)
            .prepend()
            // .find("div.main-job-div")
            // .find("div.job-card")
            // .find("div.font-14")
            .find("span.job-search-card__location")
            .text();
            crime.header = header;
            // .find("div.eKGwSj")
            // .find("h2.m0")

        //   const maincontent = $(element)
        //     .prepend()
        //     .find("div.col-sm-8")
        //     .find("div.OpinionStrapList")
        //     .text();
        //   crime.maincontent = maincontent;


        //   const dates = $(element)
        //     .prepend()
        //     .find("span.SunChDt2")
        //     .text();
        //   crime.dates = dates;

          // Main Console
        //   console.log(photo);
          console.log(header);
        //   console.log(maincontent);
        //   console.log("https://www.deccanchronicle.com/nation/crime" + link);
        //   console.log(dates);
          console.log("-----------------------\n");

          Injobsdata.push({
            ...Injobs
          });
        });
        this.setState({ Injobsdata: [...Injobsdata], loading: false });
      })
      .catch(function (err) {
        console.log("crawl failed");
      });

  }

  componentDidMount() {
    this.refreshList();
  }

  render() {
    // console.log('line 109', this.state);
    const { Injobsdata } = this.state;
    console.log(Injobsdata);

    // const size = 10
    // const crimesdata = crimesdata.slice(0, size)

    return (
      <div className="space-y-10 relative">

        <main>

          <div className="jusify-center">
            {this.state.loading ?

              <div className="justify-center"> <h1>Loading...</h1> </div> :

              <div className="item-center pl-5 pr-5">
                <div className="bg-white dark:bg-[#1D2226] py-2 rounded-lg space-y-2 overflow-hidden border border-gray-300 dark:border-none ">
                  {/* {crimesdata.slice(0, 10).map((crimdata, index ) => */}
                  {Injobsdata.map((injob, index) =>
                  (
                    <div className="main-card textAlign" key={index} >

                      {/* <img src={injob.photo} data-src={injob.photo} /> */}

                      <h1 >{injob.header}</h1>
                      {/* <h1 >{crimdata.maincontent} </h1>
                      <a href={crimdata.link} target="_blank" className="btn btn-primary"  >Read More </a>

                      <h1>Date : {crimdata.dates}</h1> */}

                    </div>

                  )
                  )}
                </div>
              </div>
            }

          </div>

        </main>
      </div>


    )
  }
}

export default India