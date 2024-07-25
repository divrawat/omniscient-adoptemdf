import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { APP_NAME, DOMAIN, IMAGES_DOMAIN, MANGA_NAME, MANGA_SUMMARY, NEXT_PREVIOUS_PREFIX, IMAGE_PREFIX, CHAPTER_PREFIX, AUTHOR_PAGE, LOGO_URL, chaptersData } from '@/config';
import DisqusComments from '@/components/DisQus';
export const runtime = 'experimental-edge';
import React from 'react';
import dynamic from 'next/dynamic';
const AdSense = dynamic(() => import('@/components/Adsense'), { ssr: false });

export default function Chapter({ chapterNumber, imageUrls, totalChapters, params, errorcode }) {

    if (errorcode) {
        return (
            <>
                <Navbar />
                <div className="text-center py-10">
                    <h1 className="text-3xl font-bold mt-10">404 Page Not Found</h1>
                    <p className="text-lg mt-4">The page you are looking for does not exist.</p>
                </div>
                <Footer />
            </>
        );
    }


    const chapterIndex = chaptersData.findIndex(chapter => chapter.chapterNumber === chapterNumber);
    const previousChapter = chapterIndex > 0 ? chaptersData[chapterIndex - 1].chapterNumber : null;
    const nextChapter = chapterIndex < totalChapters - 1 ? chaptersData[chapterIndex + 1].chapterNumber : null;


    const DESCRIPTION = `Read ${MANGA_NAME} chapter ${chapterNumber} online. Kim Dokja, an ordinary guy whose life revolves around his favorite web novel, "Three Ways to Survive in a Ruined World."  After reading it for years, the strange day arrives when the novel's events become reality. Dokja is the only one who knows what's coming, armed with the complete story in his mind.`
    const URL = params.chapter;


    const schema =
    {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${DOMAIN}/manga/${URL}`
        },
        "headline": `${MANGA_NAME} Chapter ${chapterNumber}`,
        "description": `${DESCRIPTION}`,
        "image": `${DOMAIN}/${IMAGE_PREFIX}/chapter-${chapterNumber}/1.webp`,
        "author": {
            "@type": "Person",
            "name": `${MANGA_NAME} Team`,
            "url": `${AUTHOR_PAGE}`
        },
        "publisher": {
            "@type": "Person",
            "name": `${APP_NAME}`,
            "logo": {
                "@type": "ImageObject",
                "url": `${LOGO_URL}`
            }
        },
    }

    const head = () => (
        <Head>
            <title>{`${MANGA_NAME} Chapter ${chapterNumber}`}</title>
            <meta name="description" content={DESCRIPTION} />
            <link rel="canonical" href={`${DOMAIN}/${URL}`} />
            <meta property="og:title" content={`${MANGA_NAME} Chapter ${chapterNumber}`} />
            <meta property="og:description" content={DESCRIPTION} />
            <meta property="og:type" content="webiste" />
            <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <meta property="og:url" content={`${DOMAIN}/${URL}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/images/${IMAGE_PREFIX}/chapter-${chapterNumber}/1.webp`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/images/${IMAGE_PREFIX}/chapter-${chapterNumber}/1.webp`} />
            <meta property="og:image:type" content="image/jpg" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        </Head >
    );


    const handleRedirect = () => {
        window.open('https://thampolsi.com/4/7457654', '_blank');
    };

    return (
        <>
            {head()}
            <Navbar />
            <article>
                <h1 className="text-3xl font-bold text-center p-5 md:my-5">{`${MANGA_NAME} Chapter ${chapterNumber}`}</h1>
                <p className='text-center px-4'>{`You are reading ${MANGA_NAME} Chapter ${chapterNumber}`}</p>

                <div className='mx-3 my-7'>
                    <div className="flex justify-between max-w-[800px] mx-auto md:mb-[50px] mt-5">
                        {previousChapter !== null ? (
                            <Link onClick={handleRedirect} href={`${DOMAIN}/${NEXT_PREVIOUS_PREFIX}-${previousChapter}`}>
                                <button className="text-[white] text-[13px] hover:scale-105 active:scale-95 transition-transform rounded bg-[black] px-2 py-2 font-semibold">Previous Chapter</button>
                            </Link>
                        ) : (
                            <button className="text-[white] text-[13px] rounded bg-[gray] px-2 py-2 font-semibold cursor-not-allowed" disabled>Previous Chapter</button>
                        )}

                        {nextChapter !== null ? (
                            <Link onClick={handleRedirect} href={`${DOMAIN}/${NEXT_PREVIOUS_PREFIX}-${nextChapter}`}>
                                <button className="text-[white] text-[13px] hover:scale-105 active:scale-95 transition-transform rounded bg-[black] px-2 py-2 font-semibold">Next Chapter</button>
                            </Link>
                        ) : (
                            <button className="text-[white] text-[13px] rounded bg-[gray] px-2 py-2 font-semibold cursor-not-allowed" disabled>Next Chapter</button>
                        )}

                    </div>
                </div>


                {/* <AdSense /> */}



                <div className='max-w-[1200px] mx-auto mb-5'>
                    {imageUrls.map((imageUrl, index) => (
                        <div className='allimages' key={index}>
                            <img width={700} height={600} loading="lazy" src={imageUrl} alt={`Chapter ${chapterNumber} Image ${index + 1}`} />
                        </div>
                    ))}
                </div>



                {/* <div className="max-w-[1200px] mx-auto mb-5">
                    {imageUrls.map((imageUrl, index) => (
                        <React.Fragment key={index}>
                            <div className="allimages">
                                <img
                                    loading="lazy"
                                    src={imageUrl}
                                    alt={`Chapter ${chapterNumber} Image ${index + 1}`}
                                />
                            </div>
                            {(index === 0 || index === 2 || index === 4) && (
                                <div className='p-3'>
                                    <AdSense key={`ad-${index}`} />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div> */}




                {/* <AdSense /> */}

                <div className="bg-[black] relative">
                    <div className="absolute inset-0 bg-black opacity-80"></div> {/* Dark overlay */}
                    <div className="pt-10 pb-10 max-w-[1100px] mx-auto px-5 text-[white] relative z-10">
                        <h2 className="text-center font-extrabold text-3xl">{`More About ${MANGA_NAME} Manga`}</h2>
                        {MANGA_SUMMARY.map(paragraph => (
                            <p className="py-7 leading-[2]" key={paragraph.id}>{paragraph.content}</p>
                        ))}
                    </div>
                </div>



                {/* <div className='py-10 bg-[#0f0511]'>
                    <h2 className='text-4xl text-center text-[white] font-blod px-4 mb-10'>Comment Section</h2>
                    <section className='max-w-[1000px] mx-auto px-5'>
                        <DisqusComments url={`/manga/${URL}`} identifier={chapterNumber} title={`${MANGA_NAME} Chapter ${chapterNumber}`} />
                    </section>
                </div> */}
            </article>

            <Footer />
        </>
    );
}

export async function getStaticPaths() {
    const paths = chaptersData.map(chapter => ({
        params: { chapter: `${CHAPTER_PREFIX}-${chapter.chapterNumber}` },
    }));
    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
    const chapterParam = params.chapter;
    const chapterNumber = chapterParam.split(`${CHAPTER_PREFIX}-`)[1];

    if (chapterNumber === undefined) { return { props: { errorcode: true } }; }

    const chapterData = chaptersData.find(ch => ch.chapterNumber === chapterNumber);
    if (!chapterData) { return { props: { errorcode: true } }; }

    const chapterIndex = chaptersData.findIndex(ch => ch.chapterNumber === chapterNumber);

    const totalChapters = chaptersData.length;
    const numImages = chapterData.numImages;
    const imageUrls = getImageUrls(chapterNumber, numImages);

    return { props: { chapterNumber, imageUrls, totalChapters, params, chapterIndex } };
}


const getImageUrls = (chapterNumber, numImages) => {
    const imageUrls = [];
    const chapterImagesFolder = `${IMAGES_DOMAIN}/${IMAGE_PREFIX}/chapter-${chapterNumber}`;
    for (let i = 1; i <= numImages; i++) {
        const imageUrl = `${chapterImagesFolder}/${i}.webp`;
        imageUrls.push(imageUrl);
    }
    return imageUrls;
};

