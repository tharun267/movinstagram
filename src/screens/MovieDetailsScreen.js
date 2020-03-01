import React from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Layout } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import { getMovieByID } from '../services/OMDBApi';

const MovieDetailsScreen = ({ route, navigation }) => {
    const { imdbID } = route.params;

    const [movie, setMovie] = React.useState({});
    const [loading, setLoading] = React.useState(true);


    // Set API Data 

    async function loadMovie() {
        setLoading(true)
        const moviesData = await getMovieByID(imdbID)
        setMovie(moviesData);
        setLoading(false);
    }

    React.useEffect(() => {
        loadMovie();
        return () => { }
    }, [])


    const priorityKeys = ["Year",
        "Rated",
        "Released",
        "Runtime",
        "Genre",
        "BoxOffice",
        "Language",
        "Country",
        "Production"
    ];
    if (loading) {
        return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text>Loading...</Text>
        </View>;
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView>

                <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, paddingVertical: 10 }} level="3">
                    <View style={{ height: 270, width: '40%', marginRight: 5, borderRadius: 2 }}>
                        <Image
                            style={{ flex: 1 }}
                            source={{ uri: movie.Poster }}
                        />
                    </View>

                    {/* Details */}

                    <View style={{ height: 192, width: '60%', paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', textAlign: 'left' }}>{movie.Title}</Text>

                        {priorityKeys.map((key, i) => <Text key={i}><Text style={{ fontWeight: 'bold', fontSize: 16 }}>{key}</Text> - {movie[key]} </Text>)}

                    </View>

                </Layout>

                {/* Horizontal Line */}

                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <View style={{ backgroundColor: 'lightgrey', height: 1, width: '80%' }} />
                </View>


                <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Plot: </Text>
                    <Text style={{ lineHeight: 20, color: '#242d3b' }}>{movie.Plot}</Text>
                </View>

                {/* Horizontal Line */}

                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <View style={{ backgroundColor: 'lightgrey', height: 1, width: '80%' }} />
                </View>

                {movie.Actors && <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Actors: </Text>
                    <Text style={{ lineHeight: 20, color: '#242d3b' }}>{movie.Actors.split(',').join(' | ')}</Text>
                </View>}


                <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Director: </Text>
                    <Text style={{ lineHeight: 20, color: '#242d3b' }}>{movie.Director}</Text>
                </View>

                <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Writer: </Text>
                    <Text style={{ lineHeight: 20, color: '#242d3b' }}>{movie.Writer}</Text>
                </View>


                <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Awards: </Text>
                    <Text style={{ lineHeight: 20, color: '#242d3b' }}>{movie.Awards}</Text>
                </View>

                <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>DVD: </Text>
                    <Text style={{ lineHeight: 20, color: '#242d3b' }}>{movie.DVD}</Text>
                </View>

                <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Box Office: </Text>
                    <Text style={{ lineHeight: 20, color: '#242d3b' }}>{movie.BoxOffice}</Text>
                </View>

                <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Other Ratings</Text>
                    {movie.Ratings.map((x, i) => <Text key={i} style={{ lineHeight: 24, color: '#242d3b' }}>{x.Source} - {x.Value}</Text>)}
                </View>


            </ScrollView>

        </SafeAreaView>
    )
}

export default MovieDetailsScreen
