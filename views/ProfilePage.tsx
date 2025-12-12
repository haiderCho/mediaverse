import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ProfilePageProps {
  onBack: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/haiderCho' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white fade-in overflow-y-auto py-20">
      <button 
        onClick={onBack} 
        className="absolute top-8 left-8 p-2 bg-slate-800 rounded-full hover:bg-slate-700"
      >
        <ArrowLeft />
      </button>
      
      <div className="max-w-4xl w-full p-8 border border-slate-800 rounded-2xl bg-slate-900/50 text-center mx-4">
        <img 
          src="https://picsum.photos/150/150?grayscale" 
          className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-red-600" 
          alt="Profile" 
        />
        
        <h1 className="text-4xl font-bold mb-6 text-red-600" style={{fontFamily: 'Poppins'}}>NAFIZ HAIDER CHOWDHURY</h1>
        
        {/* About Me */}
        <div className="text-left mb-8 text-slate-300 space-y-4 text-sm">
          <p className="italic">
            "My quietness and introverted nature is a consequence of my deeply entrenched nihilism. 
            I don't believe there is any real value in my or anyone else's speaking, 
            and I think that all of human existence is fundamentally insignificant."
          </p>
          <p>
            Hence, everything about this world displeases me; but, above all, my displeasure in everything displeases me, 
            but I find comfort in good fiction and music.
          </p>
          <p>
            I've read numerous Books, Comics/Visual Novels, Manga/Manhwa/Manhua; watched thousands of movies, anime. 
            I can't in good conscience pick just 10 of my favourite of anything from within numerous genres that exists in these fields. 
            I have a few favourite genres and I'll pick 5-10 favourite from each of these genres.
          </p>
        </div>

        {/* How I Judge Good Writing - Collapsible */}
        <details className="text-left mb-8 border-t border-slate-700 pt-6">
          <summary className="text-3xl font-bold text-red-500 cursor-pointer mb-6 text-center list-none">How I Judge Good Writing</summary>
          <div className="text-slate-300 space-y-6 text-sm mt-4">
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">1. Coherent and Cohesive Logic</h3>
              <p>
                No matter how fantastical and absurd a fictional world is, it has to all make sense together.
                The world doesn't have to be anything like our world, but it has to have clarity.
                All the pieces must fit together in a logical fashion.
                If any one part of it sticks out and feels odd that's a RED flag in my book.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">2. Cause and Effect</h3>
              <p>
                Writers spend a considerable amount of time developing the motives of the characters.
                But what about the motives of the world?
                Taking the time to consider the societal and political motives and how they impact the characters' lives
                can add a considerable amount of depth and realism to a story.
                It's also a great way to develop a great theme for a story.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">3. Strategic Details/Worldbuilding</h3>
              <p>
                Worldbuilding can involve developing and writing down a considerable amount of backstory and history to the location and characters in the story.
                Some of this information will be important to share with the reader, but a lot of it is only important to the author.
                One of your greatest challenges is figuring out which details are important for the readers to know and which are not.
                It's also important to know when to introduce the details. Starting a novel with a lot of info dump is a bad idea.
                The reader doesn't need to know everything within the opening pages.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">4. Mystery</h3>
              <p>
                Mystery is closely related to worldbuilding.
                By not telling the reader everything and creating intrigue in how you introduce information is a great way to create lifelong fans.
                A sense of discovery and giving readers an opportunity to speculate and theorize what may be coming next is ideal.
                New worlds should be left for discovery, not dumped on us like a history book.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">5. Depth and Width</h3>
              <p>
                One of the reasons I love fantasies so much is because of their close connection to the natural world.
                Describing the views of nature is a part of writing I love the most.
                But it's not enough to only describe what the eye can see. Be sure to play with all the senses: sight, smell, sound, taste, and touch.
                Doing so will create considerable depth to the story and really draw the reader in.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">6. Mirrors Our Real World with Deviations</h3>
              <p>
                Let's face it, we are drawn to the familiar.
                No matter how fantastical a world becomes, adding even the most minor elements of familiarity engage readers.
                Often without them even realizing it. Mirroring our real world to varying degrees is not only intriguing but desired.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">7. Complexity</h3>
              <p>
                The degree of complexity needed for a world will be heavily influenced by the plot and overall story the writer wants to tell.
                If he's embarking on the journey of creating the next best epic fantasy, complexity is a must.
                Just as our world is, your world should also be complex. Considering elements such as culture (multicultural), religions, societal divisions, economy, etc. add a higher sense of believability to the world.
                Simplicity has its place, but not always where worldbuilding is concerned.
              </p>
            </div>
          </div>
        </details>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 border-t border-slate-700 pt-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-slate-800 hover:bg-red-600 transition-colors rounded text-sm"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
