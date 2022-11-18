const { MongoClient } = require("mongodb");
async function dbconnection() {
    try {
        const client = new MongoClient("mongodb://localhost:27017");
        const data = await client.connect()
        var db = data.db("mountains")
    } catch (err) {
        console.log(err)
    }
    return db;
}
async function insertrecord() {
    return new Promise(async(resolve, reject) => {
        const db = await dbconnection();
        aggregateReadings(db)
    })
}

async function aggregateReadings(db) {
    /*   const recdata = await db.collection("departments").aggregate([{
              $group: {
                  "_id": { refid: "$refid", type: "$type" },
                  count: { $sum: 1 },

              },
              $group: {
                  "_id": { refid: "$refid", type: "$type" },
                  "first": { $first: "$effectiveDateTime" },
                  "last": { $last: "$effectiveDateTime" }
              },
          ]).toArray() */

    /* const recdata = await db.collection("departments").aggregate([
        { $sort: { "effectiveDateTime": -1 } }
    ]).toArray() */

    /* const recdata = await db.collection("departments").aggregate([{
        $project: {
            _id: 0,
            "id": 1,
            "type": 1,
            "timestamp": "$effectiveDateTime",
            "value1": {
                $cond: { if: { $eq: ["$type", "bp"] }, then: { $arrayElemAt: ["$data.component.valueQuantity.value", 0] }, else: "$data.valueQuantity.value" }
            },
            "value2": { $arrayElemAt: ["$data.component.valueQuantity.value", 1] }
        }
    }]).toArray() */
    /*  const recdata = await db.collection("departments").aggregate([{
                 $match: { type: { $nin: ["bp"] } }
             },
             {
                 $group: {
                     "_id": { refid: "$refid", type: "$type" },
                     min: { $min: { $toInt: "$data.valueQuantity.value" } },
                     max: { $max: { $toInt: "$data.valueQuantity.value" } }
                 },
             }
         ]).toArray() */
    const recdata = await db.collection("departments").aggregate([{

            // $match: { id: "20220801005007", type: "bp" }
            $match: { $and: [{ id: { $gte: "20220801005045" } }, { effectiveDateTime: { $gte: "2022-11-06T11:51:00Z" } }] }
        }]).toArray()
        /* const recdata = await db.collection("departments").aggregate([{
                $group: {

                    "_id": { refid: "$refid", type: "$type" },
                    count: { $sum: 1 },
                }
            },
            { $match: { count: { $gt: 3 } } }

        ]).toArray() */
        /*  const recdata = await db.collection("departments").aggregate([{
                 $match: { type: { $in: ["glucose"] } }
             },
             {
                 $group: {
                     _id: { refid: "$refid" },
                     total: { $sum: { $toInt: "$data.valueQuantity.value" } },
                     count: { $sum: 1 }
                 },
             }
         ]).toArray() */

    console.log(recdata)

}
insertrecord()