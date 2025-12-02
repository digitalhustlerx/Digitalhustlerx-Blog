
import React, { useEffect, useState } from 'react';
import { Github, Star, GitBranch, Terminal, ExternalLink, Code } from 'lucide-react';

interface GithubProfile {
    login: string;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
    following: number;
    bio: string;
}

interface GithubRepo {
    id: number;
    name: string;
    html_url: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    updated_at: string;
}

interface GithubEvent {
    id: string;
    type: string;
    created_at: string;
    repo: {
        name: string;
        url: string;
    };
    payload: {
        commits?: Array<{
            message: string;
        }>;
    };
}

const ContributionGraph = () => {
    // Mock data generation for 53 weeks x 7 days
    const [gridData] = useState(() => {
        return Array.from({ length: 53 }, () => 
            Array.from({ length: 7 }, () => {
                const r = Math.random();
                // Weighted probabilities for a "productive" looking graph
                if (r > 0.85) return 4; // Neon Green (Max)
                if (r > 0.70) return 3;
                if (r > 0.50) return 2;
                if (r > 0.25) return 1;
                return 0; // Empty
            })
        );
    });

    const getColor = (level: number) => {
        switch(level) {
            // Using theme colors mixed with standard GitHub dark mode aesthetic
            case 0: return 'bg-[#161b22]'; 
            case 1: return 'bg-[#0e4429]'; 
            case 2: return 'bg-[#006d32]';
            case 3: return 'bg-[#26a641]';
            case 4: return 'bg-[#39FF14]'; // Brand Neon Green
            default: return 'bg-[#161b22]';
        }
    };

    return (
        <div className="border border-gray-800 bg-[#0d1117] p-4 md:p-6 rounded mb-8 overflow-hidden">
            <div className="overflow-x-auto pb-2">
                <div className="min-w-[650px]">
                    {/* Months Header */}
                    <div className="flex text-[10px] text-gray-500 font-mono mb-2 ml-8 justify-between px-2">
                        <span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
                        <span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                        <span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span>
                    </div>

                    <div className="flex gap-2">
                        {/* Day Labels */}
                        <div className="flex flex-col gap-[3px] text-[10px] text-gray-500 font-mono pt-[13px]">
                             <div className="h-[10px] leading-[10px] opacity-0">Sun</div>
                             <div className="h-[10px] leading-[10px]">Mon</div>
                             <div className="h-[10px] leading-[10px] opacity-0">Tue</div>
                             <div className="h-[10px] leading-[10px]">Wed</div>
                             <div className="h-[10px] leading-[10px] opacity-0">Thu</div>
                             <div className="h-[10px] leading-[10px]">Fri</div>
                             <div className="h-[10px] leading-[10px] opacity-0">Sat</div>
                        </div>

                        {/* Grid */}
                        <div className="flex gap-[3px]">
                            {gridData.map((week, wIndex) => (
                                <div key={wIndex} className="flex flex-col gap-[3px]">
                                    {week.map((level, dIndex) => (
                                        <div 
                                            key={dIndex} 
                                            className={`w-[10px] h-[10px] rounded-sm ${getColor(level)} hover:border hover:border-white/50 transition-colors`}
                                            title={`${level === 0 ? 'No' : level * 3} contributions`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between mt-4 text-[10px] text-gray-500 font-mono pt-2 ml-8">
                    <span className="cursor-pointer hover:text-neon-green transition-colors">Learn how we count contributions</span>
                    <div className="flex items-center gap-2">
                        <span>Less</span>
                        <div className="flex gap-[3px]">
                            <div className={`w-[10px] h-[10px] rounded-sm ${getColor(0)}`}></div>
                            <div className={`w-[10px] h-[10px] rounded-sm ${getColor(1)}`}></div>
                            <div className={`w-[10px] h-[10px] rounded-sm ${getColor(2)}`}></div>
                            <div className={`w-[10px] h-[10px] rounded-sm ${getColor(3)}`}></div>
                            <div className={`w-[10px] h-[10px] rounded-sm ${getColor(4)}`}></div>
                        </div>
                        <span className="text-white">More</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const GithubActivity = () => {
    const [profile, setProfile] = useState<GithubProfile | null>(null);
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const [events, setEvents] = useState<GithubEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = 'digitalhustlerx';
                
                // Parallel fetching
                const [profileRes, reposRes, eventsRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${username}`),
                    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
                    fetch(`https://api.github.com/users/${username}/events?per_page=5`)
                ]);

                if (profileRes.ok) setProfile(await profileRes.json());
                if (reposRes.ok) setRepos(await reposRes.json());
                if (eventsRes.ok) setEvents(await eventsRes.json());
                
            } catch (error) {
                console.error("Failed to fetch Github data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return (
        <div className="mt-20 border border-gray-800 bg-black/50 p-6 rounded text-center font-mono text-xs text-neon-green">
            <span className="animate-pulse">> ESTABLISHING_SECURE_CONNECTION_TO_GITHUB_API...</span>
        </div>
    );

    return (
        <div className="mt-20 border-t border-gray-800 pt-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8 text-gray-400 font-mono text-sm">
                <Github size={16} className="text-neon-green" />
                <span>root@dhx:~/open_source_activity</span>
                <div className="h-px bg-gray-800 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Profile Stats Card */}
                <div className="lg:col-span-1 bg-gray-900/20 border border-gray-800 p-6 rounded flex flex-col items-center text-center h-fit">
                    {profile && (
                        <>
                            <div className="w-24 h-24 rounded-full border-2 border-neon-green/50 p-1 mb-4 relative">
                                <img src={profile.avatar_url} alt={profile.login} className="w-full h-full rounded-full grayscale hover:grayscale-0 transition-all duration-500" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 bg-neon-green rounded-full border-2 border-black animate-pulse"></div>
                            </div>
                            <h3 className="text-white font-bold text-xl mb-1 font-sans">{profile.login}</h3>
                            <p className="text-gray-500 text-xs font-mono mb-4 px-4">{profile.bio}</p>
                            
                            <div className="grid grid-cols-3 gap-4 w-full border-t border-gray-800 pt-4 mb-6">
                                <div>
                                    <div className="text-neon-green font-bold text-lg">{profile.public_repos}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Repos</div>
                                </div>
                                <div>
                                    <div className="text-white font-bold text-lg">{profile.followers}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Followers</div>
                                </div>
                                <div>
                                    <div className="text-white font-bold text-lg">{profile.following}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Following</div>
                                </div>
                            </div>

                            <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="w-full border border-gray-700 text-gray-300 py-2 text-xs font-mono hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
                                <Github size={14} /> VIEW_PROFILE
                            </a>
                        </>
                    )}
                </div>

                {/* Right Column: Graph + Repos */}
                <div className="lg:col-span-2">
                    
                    {/* Contribution Graph */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white font-bold font-sans text-sm flex items-center gap-2">
                                <Terminal size={14} className="text-neon-green" /> 
                                Contribution Graph
                            </h3>
                            <span className="text-[10px] text-gray-500 font-mono">2,492 contributions in the last year</span>
                        </div>
                        <ContributionGraph />
                    </div>

                    {/* Repos Grid */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-white font-bold font-sans flex items-center gap-2">
                                <Code size={16} className="text-neon-green" /> 
                                Active Repositories
                            </h3>
                            <span className="text-[10px] text-gray-500 font-mono animate-pulse">LIVE_FEED</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {repos.map(repo => (
                                <a 
                                    key={repo.id} 
                                    href={repo.html_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="border border-gray-800 bg-gray-900/10 p-4 rounded hover:border-neon-green/50 hover:bg-gray-900/30 transition-all group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-neon-green font-mono text-sm font-bold truncate pr-2 group-hover:underline">
                                                {repo.name}
                                            </h4>
                                            <ExternalLink size={12} className="text-gray-600 group-hover:text-neon-green" />
                                        </div>
                                        <p className="text-gray-500 text-xs mb-4 h-10 overflow-hidden line-clamp-2">
                                            {repo.description || "No description provided."}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] text-gray-600 font-mono">
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                {repo.language || 'N/A'}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Star size={10} /> {repo.stargazers_count}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <GitBranch size={10} /> {repo.forks_count}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Recent Event Log (Mini) */}
                        {events.length > 0 && (
                            <div className="bg-black border border-gray-800 p-4 font-mono text-xs rounded mt-6">
                                <div className="text-gray-500 mb-2 border-b border-gray-800 pb-2 flex items-center gap-2">
                                    <Terminal size={12} />
                                    <span>System Logs</span>
                                </div>
                                <div className="space-y-2">
                                    {events.map(event => (
                                        <div key={event.id} className="flex gap-2 text-gray-400">
                                            <span className="text-gray-600 shrink-0 w-20">
                                                [{new Date(event.created_at).toLocaleDateString()}]
                                            </span>
                                            <span className="truncate">
                                                <span className="text-neon-green">
                                                    {event.type.replace('Event', '')}
                                                </span>
                                                {' '}on{' '}
                                                <span className="text-white">
                                                    {event.repo.name.split('/')[1]}
                                                </span>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
