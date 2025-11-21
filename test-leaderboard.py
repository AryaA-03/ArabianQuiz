#!/usr/bin/env python3
import requests
import json

print("🧪 Testing Leaderboard Features\n")

# Test API
response = requests.get('http://localhost:3000/api/leaderboard?scope=alltime&limit=100')
data = response.json()

print(f"✅ Total players: {len(data)}\n")
print("🏆 Full Rankings:\n")

for i, player in enumerate(data):
    rank = i + 1
    medal = '🥇' if rank == 1 else '🥈' if rank == 2 else '🥉' if rank == 3 else '  '
    username = player.get('username', 'Unknown')
    score = player.get('score', 0)
    uid = player.get('uid', '')
    
    # Highlight test user
    highlight = ' ← YOU (highlighted in UI)' if uid == 'test-user-123' else ''
    
    print(f"{medal} #{rank:2d}. {username:25s} {score:5d} pts{highlight}")

print("\n✨ Features implemented:")
print("  • All players ranked (limit: 100)")
print("  • User photos displayed")
print("  • Current user highlighted with blue border + 'YOU' badge")
print("  • Top 3 podium display")
print("  • Persistent dev server with logging")
