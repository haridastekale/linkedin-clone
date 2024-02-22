import React from 'react';
import cheerio from "cheerio";
import axios from "axios";
import Head from "next/head";
import Header from "../components/Header";
import Python from '../components/language/Python';
import Java from '../components/language/Java';


class about extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      crimesdata: [],
    }
  }

  refreshList() {
    axios.get("https://cors-anywhere.herokuapp.com/https://deccanchronicle.com/nation/crime" || "http://localhost:3000/")
      .then(html => {
        const crimesdata = [];
        const $ = cheerio.load(html.data);

        $('div.SunChNewListing').each((_i, element) => {
          let crime = {};;
          const photo = $(element)
            .prepend()
            .find("div.ThumbImg")
            .find("img")
            .attr("data-src");
          crime.photo = photo;

          const link = $(element)
            .prepend()
            .find("div.ThumbImg")
            .find("a.noPadding")
            .attr("href");
          crime.link = "https://www.deccanchronicle.com/" + link;


          const header = $(element)
            .prepend()
            .find("div.col-sm-8")
            .find("h3.SunChroListH3")
            .text();
          crime.header = header;

          const maincontent = $(element)
            .prepend()
            .find("div.col-sm-8")
            .find("div.OpinionStrapList")
            .text();
          crime.maincontent = maincontent;


          const dates = $(element)
            .prepend()
            .find("span.SunChDt2")
            .text();
          crime.dates = dates;

          // Main Console
          console.log(photo);
          console.log(header);
          console.log(maincontent);
          console.log("https://www.deccanchronicle.com/nation/crime" + link);
          console.log(dates);
          console.log("-----------------------\n");

          crimesdata.push({
            ...crime
          });
        });
        this.setState({ crimesdata: [...crimesdata], loading: false });
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
    const { crimesdata } = this.state;

    // const size = 10
    // const crimesdata = crimesdata.slice(0, size)

    return (
      <div className="space-y-10 relative">

        <Head>
          <title>Linkedin-home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>


        <Header />
        <main>

          <div className="jusify-center">
            {this.state.loading ?

              <div className="justify-center"> <h1>Loading...</h1> </div> :

              <div className="item-center pl-5 pr-5">
                <div className="bg-white dark:bg-[#1D2226] py-2 rounded-lg space-y-2 overflow-hidden border border-gray-300 dark:border-none ">
                  {/* {crimesdata.slice(0, 10).map((crimdata, index ) => */}
                  {crimesdata.slice(0, 10).map((crimdata, index) =>
                  (
                    <div className="main-card textAlign" key={index} >

                      <img src={crimdata.photo} data-src={crimdata.photo} />

                      <h1 >{crimdata.header}</h1>
                      <h1 >{crimdata.maincontent} </h1>
                      <a href={crimdata.link} target="_blank" className="btn btn-primary"  >Read More </a>

                      <h1>Date : {crimdata.dates}</h1>

                    </div>

                  )
                  )}
                </div>
              </div>
            }

          </div>

          <div className="justify-center">
            <div className="item-center pl-5 pr-5">
              <div className="bg-white dark:bg-[#1D2226] py-2 rounded-lg space-y-2 overflow-hidden border border-gray-300 dark:border-none">

                {/* <div className=" overflow-y-scroll"> */}
                <div className="m-8">
                  <Python className="ml-10 mr-10 " />
                </div>
                <div className="m-8">
                  <Java className="ml-10 mr-10 " />
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </main>
      </div>


    )
  }
}

export default about